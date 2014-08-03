var _ = require('underscore');
var path = require('path');
var fs = require('fs');
var os = require('os');
var dns = require('dns');

var lowerCache = {};

keysToLower = function (obj){

    if (typeof(obj) === "string" || typeof(obj) === "number" || typeof(obj) === "boolean")
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

         var newValue = obj[key];
         ret[newKey] = typeof(newValue) === "string" ? newValue : keysToLower(newValue);
     }
     return ret;
    }
};




function Config(configOverrides) {
	this.agents = [];
	this.agent = "";
	this.units =[];
	this.agentgroup = "";
	this.agentname = "";
	this.appPath = path.dirname(process.mainModule.filename);
	if(configOverrides !==  undefined  && configOverrides.appPath !==  undefined) this.appPath  = configOverrides.appPath;
	
	this._loadConfigFromFile(configOverrides);
}

Config.prototype.defaults = {
	'name':				'Deploy Agent',
	'port':				process.env.PORT || 4333,
	'apikey': 'asdasdad3242352jji',
	'enable-demo': false,
	'demo-agent-name': 'demo-01'
};

Config.prototype._applyConfig = function(cfg) {
var configlowerkeys = keysToLower(cfg);

Object.keys(configlowerkeys).forEach(function(key) {
            this[key] = configlowerkeys[key];
	}.bind(this)); 
};

Config.prototype._fqdnlookup = function(callback) {
	var ip ="";
	if(os.platform() === "linux"){
		ip = os.networkInterfaces().eth0[0].address.toString();
	}
	else{
		ip = os.networkInterfaces().Ethernet[0].address.toString() ;		
	}
	this.ip = ip;
	dns.reverse(ip, callback.bind(this));
}


Config.prototype._dnsReversCallback = function (err,domains) {
	if (err) throw err;

	this.fqdn =  domains.toString();

	if (this["enable-demo"] !== true ) this.webcontrolurl = "http://" + this.ip + ":" + this.port;
}

Config.prototype.getAgent = function() {
	var hostname = os.hostname();

	if (this["enable-demo"] === true) hostname = this["demo-agent-name"];

	this.agent = _.find(this.agents, function(agent) { return agent.name === hostname; });

	return this.agent;
}

Config.prototype.capitalizeString = function( capitalizeString ){
	var capitalized = capitalizeString.charAt(0).toUpperCase() + capitalizeString.substring(1);
	return capitalized;
}

Config.prototype.getUnitActions = function(name) {
	var unitActions = [];
	var unit = _.find(this.units, function(unit) { return unit.name === name; });

	if(unit.actions === undefined ) return unitActions;
  
	_.keys(unit.actions).forEach(function(key) {
			unitActions.push(this.capitalizeString(key));
	}.bind(this));

	return unitActions;
};


Config.prototype._setWebControlUrl = function() {
			this.webcontrolurl = "http://localhost:" + this.port;
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
	var configPath = path.join(this.appPath, 'config.json');
	
	this._applyConfig(this.defaults);
	
	if (fs.existsSync(configPath)) {
		var config = require(configPath);
		this._applyConfig(config);
	}
		
	if (configOverrides) {
		this._applyConfig(configOverrides);
	}
	
	this._setWebControlUrl();	
 
	this._fqdnlookup(this._dnsReversCallback);

	this.agent = this.getAgent.bind(this)();
	this.agentname = this.agent.name;

  var environment = this.agent.environment;
  if(environment !== undefined){
		var unitconfigPath = path.join(this.appPath, 'config.'+environment+'.json');
		if (fs.existsSync(configPath)) {
			var unitconfig = require(unitconfigPath);
			this._applyConfig(unitconfig);
		}
 }
};


module.exports = {
	Config: Config
};