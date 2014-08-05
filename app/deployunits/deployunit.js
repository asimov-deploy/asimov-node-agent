var _ = require("underscore");
var events = require('events');
var util = require('util');
Models = require('../models');
var _deployunitinfo;
var _server;
var _unitinfo;

function combineActions(defaultActions, unitActions)
{
		if (typeof defaultActions != 'undefined'){
			if(unitActions.length === 0 ) {
				return defaultActions;
			} 
		else{
			return  _.union(defaultActions, unitActions);
		}
	}
}

function DeployUnit(server, name) {
	events.EventEmitter.call(this);
	this._config = server.config;
  this._server = server;
  this._name = name;
	this._deployunitinfo = new Models.deployunitinfodto();
	this._actions = {};
	this._defaultActions = [];
	this._serviceName = "";
	this._requriredPlatform ="";
	this._LoadUnitInfo();
 }

DeployUnit.prototype.__proto__ = events.EventEmitter.prototype;

DeployUnit.prototype._LoadUnitInfo = function() {
	var unitinfo = this._config.getUnit(this._name);
	this._unitinfo = unitinfo;
	if(this._unitinfo.type.toLowerCase() === "windowsservice") this._serviceName = this._unitinfo.servicename;
	if(this._unitinfo.type.toLowerCase() === "linuxprocess") this._serviceName = this._unitinfo.processname.toLowerCase();
	if(this._unitinfo.type.toLowerCase() === "linuxupstart") this._serviceName = this._unitinfo.processname.toLowerCase();
	this._hasStatus = true;

}

DeployUnit.prototype.getDeployUnitInfo = function(callback) {
	var name = this._name;
	var unitInfo = this._config.getUnit(name);

  var unitInfoDTO = new Models.deployunitinfodto();
  unitInfoDTO.name = name;
  unitInfoDTO.actions = this._config.getUnitActions(name);
  unitInfoDTO.url= unitInfo.url;
	if( unitInfo.deployparameters !== undefined && unitInfo.deployparameters.length !== 0){
			unitInfoDTO.hasDeployParameters = true;
	}

	unitInfoDTO.actions = combineActions(this.defaultActions, unitInfoDTO.actions );
	
	if(this._requriredPlatform !== process.platform || !this._hasStatus) return (callback(unitInfoDTO));

	var command = {
			server: this._server,
			serviceName: this._serviceName,
			actionName: "Status"
	};

	this._actions.status(command,  function(status){
			var statusText = this.getStatusText(status);
			unitInfoDTO.status = statusText;
			callback(unitInfoDTO);
			}.bind(this));
}

 DeployUnit.prototype.getUnitType =  function() {
  console.log("DeployUnit:" + this._unitinfo.type);
	return this._unitinfo.type;
};

DeployUnit.prototype.getStatusText = function(text) {};

DeployUnit.prototype.executeAction = function(params) {
	console.log('DeployUnit. executeAction'); 
	var paramsAction = params.actionName.toLowerCase();
	var action = function(){};

	if(_.contains(_.keys(this._actions) , paramsAction) )
	{
		action =  this._actions[paramsAction];
		params.serviceName = this._serviceName;
		params.server = this._server;
		params.unitName = this._name;
		action(params);
	}
	else{
		var customActions = this._config.getUnitActions(this._name);
		if( _.contains( customActions , this._config.capitalizeString(paramsAction)))
		{
			var customAction = this._unitinfo.actions[paramsAction];
			if(_.contains(_.keys(this._actions) , customAction.type.toLowerCase()))
			{
				action =  this._actions[customAction.type.toLowerCase()];
				customAction.actionName = paramsAction;
				customAction.unitName = this._name;
				customAction.server = this._server;
				action(customAction);
			}
		}
	}
}

 DeployUnit.prototype.deploy =  function() {
  console.log("DeployUnit: deploy");
};


module.exports =  DeployUnit;




