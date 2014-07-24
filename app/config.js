var _ = require("underscore");
var path = require('path');
var fs = require('fs');
var os = require("os");

var lowerCache = {};

keysToLower = function (obj)
{
    if (typeof(obj) === "string" || typeof(obj) === "number")
        return obj;

        var l = obj.length;
    if (l) {
        l |= 0;
        var result = [];
        result.length = l;
        for (var i = 0; i < l; i++) {
            var newVal = obj[i];
            result[i] = typeof(newVal) === "string" ? newVal : keysToLower(newVal);
        }
        return result;
    } else {
     var ret = {};
     for (var key in obj) {

         var keyStr = typeof(key) === "string" ? key : String(key);
         var newKey = lowerCache[keyStr];
         if (newKey === undefined) {
             newKey = keyStr.toLowerCase();
             lowerCache[keyStr] = newKey;
         }

         var newVal = obj[key];
         ret[newKey] = typeof(newVal) === "string" ? newVal : keysToLower(newVal);
     }
     return ret;
    }
};

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

	var configlowerkeys = keysToLower(cfg);

	Object.keys(configlowerkeys).forEach(function(key) {
	            this[key] = configlowerkeys[key];
		}.bind(this)); 
	};

	Config.prototype.getAgent = function() {
		var hostname = os.hostname();
		return _.find(this.agents, function(agent) { return agent.name === hostname; });
	};

	Config.prototype.getUnitActions = function(name) {
		var unitActions = [];
		var unit = _.find(this.units, function(unit) { return unit.name === name; });

		if(unit.actions === undefined ) return unitActions;

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

	Config.prototype.getDeployParameters = function(name) {
			var deployParameters = [];
			var unit =  this.getUnit(name);
	     
			if(unit.deployparameters === undefined ) return deployParameters;
			
			Object.keys(unit.deployparameters).forEach(function(key) {
					var param = unit.deployparameters[key];
					param.name = key;
					param.type = param.type.toLowerCase();

					deployParameters.push(param);
	      });
				
			return deployParameters;
		};


	Config.prototype.getUnit = function(name) {
			var unit = _.find(this.units, function(unit) { return unit.name === name ; });
			return unit;	
	};

	Config.prototype.getUnitType = function(name) {
			return this.getUnit(name).type + "unit";	
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
  if(environment !== undefined)
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