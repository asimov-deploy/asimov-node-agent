var _ = require("underscore");
var _deployunitinfo;
var _server;
var _unitinfo;
var _deployStatus;
var _unitStatus;

var DeployStatus = {
  NA : {value: 0, name: "NA"},
  Deploying: {value: 1, name: "Deploying"},
  DeployFailed : {value: 2, name: "DeployFailed"}
};

var UnitStatus = {
  NA : {value: 0, name: "NA"},
  NotFound: {value: 1, name: "NotFound"},
  Running: {value: 2, name: "Running"},
  Stopped : {value: 3, name: "Stopped"},
  Stopping : {value: 4, name: "Stopping"},
  Starting : {value: 5, name: "Starting"}
};

function deployUnitInfoDTO(){
	this.name=  "";
	this.url= "";
	this.version = "";
	this.branch = "";
	this.status =  "NA";
	this.lastDeployed = "";
	this.hasDeployParameters = false;
	this.actions = [];
}

function deployedVersionDTO(){
	this.versionNumber= "";
	this.versionTimestamp = "";
	this.versionCommit = "";
	this.versionBranch = "";
	this.deployedTimestamp = "";
}

function DeployUnit(server, name) {
	this._config = server.config;
  this._server = server;
  this._name = name;
  this._deployStatus = DeployStatus;
	this._unitStatus   = UnitStatus;
	this._deployunitinfo = new deployUnitInfoDTO();
	this._actions = {};
	this._defaultActions = [];
	this._serviceName = "";
	this._LoadUnitInfo();
 }

DeployUnit.prototype._LoadUnitInfo = function() {
	var unitinfo = this._config.getUnit(this._name);
	this._unitinfo = unitinfo;
	if(this._unitinfo.type.toLowerCase() === "windowsservice") this._serviceName = this._unitinfo.servicename;
	if(this._unitinfo.type.toLowerCase() === "linuxprocess") this._serviceName = this._unitinfo.processname.toLowerCase();

}

DeployUnit.prototype.getDeployUnitInfo = function() {
	var name = this._name;
	var unitInfo = this._config.getUnit(name);

  var unitInfoDTO = new deployUnitInfoDTO();
  unitInfoDTO.name = name;
  unitInfoDTO.actions = this._config.getUnitActions(name);
  unitInfoDTO.url= unitInfo.url;
	if( unitInfo.deployparameters !== undefined && unitInfo.deployparameters.length !== 0){
			unitInfoDTO.hasDeployParameters = true;
	}
	if (unitInfoDTO.actions.length === 0){
		unitInfoDTO.actions = this.defaultActions;
  } 
  else{
		unitInfoDTO.actions = _.union(this.defaultActions, unitInfoDTO.actions );
  }

	return unitInfoDTO;
}

 DeployUnit.prototype.getUnitType =  function() {
  console.log("DeployUnit:" + this._unitinfo.type);
	return this._unitinfo.type;
};

DeployUnit.prototype.executeAction = function(params) {
	console.log('DeployUnit. executeAction'); 
	var paramsAction = params.actionName.toLowerCase();
	var action = function(){};

	if(_.contains(_.keys(this._actions) , paramsAction) )
	{
		action =  this._actions[paramsAction];
		params.serviceName = this._serviceName;
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
				action(customAction);
			}
		}
	}
}

 DeployUnit.prototype.deploy =  function() {
  console.log("DeployUnit: deploy");
};


module.exports =  DeployUnit;




