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
	console.log("ctor : deployunit");    
	this._config = server.config;
  this._server = server;
  this._name = name;
  this._deployStatus = DeployStatus;
	this._unitStatus   = UnitStatus;
	this._deployunitinfo = new deployUnitInfoDTO();
	this._LoadUnitInfo()
 }

DeployUnit.prototype._LoadUnitInfo = function() {
	var unitinfo = this._config.getUnit(this._name);
	this._unitinfo = unitinfo;
}

DeployUnit.prototype.getDeployUnitInfo = function() {
	var name = this._name;
	var unitInfo = this._config.getUnit(name);

  var unitInfoDTO = new deployUnitInfoDTO();
  unitInfoDTO.name = name;
  unitInfoDTO.actions.concat(this._config.getUnitActions(name));
  unitInfoDTO.url= unitInfo.url;
	if( unitInfo.deployparameters !== undefined && unitInfo.deployparameters.length !== 0){
			unitInfoDTO.hasDeployParameters = true;
	}

	return unitInfoDTO;
}

 DeployUnit.prototype.getUnitType =  function() {
  console.log("DeployUnit:" + this._unitinfo.type);
	return this._unitinfo.type;
};

DeployUnit.prototype.executeAction = function(name) {
	console.log('DeployUnit. executeAction'); 
}

 DeployUnit.prototype.deploy =  function() {
  console.log("DeployUnit: deploy");
};


module.exports =  DeployUnit;




