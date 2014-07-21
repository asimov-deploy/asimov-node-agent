var _ = require("underscore");
var path = require('path');
var fs = require('fs');
var os = require("os");


function Config(configOverrides) {
		this.agents = [];
	this.agent = "";
	this.units =[];
	this.agentgroup = "";
	this._loadConfigFromFile(configOverrides);
}

Config.prototype.defaults = {
	'name':				'Deploy UI',
	'enable-demo':		false,
	'port':				process.env.PORT || 3333,
	'session-secret': 'asdasdad3242352jji3o2hkjo1n2b3',
	'auth-anonymous':	true,
	'plugins': []
};

Config.prototype._applyConfig = function(cfg) {

	Object.keys(cfg).forEach(function(key) {
            this[key.toLowerCase()] = cfg[key];
	}.bind(this));
};

Config.prototype.getAgent = function() {
	var hostname = os.hostname();
	return _.find(this.agents, function(agent) { return agent.name === hostname; });
};

Config.prototype.getUnitActions = function(name) {
	var hostname = os.hostname();
	var unitActions = [];
	var unit = _.find(this.units, function(unit) { return unit.name === name; });

	if( Object.prototype.toString.call( unit.actions ) === '[object Array]' ) {
    		unit.actions.forEach(function(action) {
    		unitActions.push(Object.keys(action)[0]);
			});
		}
		else {
			unitActions.push(Object.keys(unit.actions)[0])
		}

	return unitActions;
};

Config.prototype._loadConfigFromFile = function(configOverrides) {
	var appPath = path.dirname(process.mainModule.filename);
	
	var configPath = path.join(appPath, 'config.json');

	this._applyConfig(this.defaults);

	if (fs.existsSync(configPath)) {
		var config = require(configPath);
		this._applyConfig(config);
	}

	if (configOverrides) {
		this._applyConfig(configOverrides);
	}

	this.agent = this.getAgent();
  var environment = this.agent.environment;
  if(environment != undefined)
 {
	var unitconfigPath = path.join(appPath, 'config.'+environment+'.json');
	if (fs.existsSync(configPath)) {
		var unitconfig = require(unitconfigPath);
		this._applyConfig(unitconfig);
	}
 }	
};


module.exports = {
	Config: Config
};