var util = require("util");
var deployunit = require("./deployunit");
var PowerShellUnit = function(server, name) {
    PowerShellUnit.super_.call(this,server, name); // call deployunit's constructor
    this._loadTasks();
    console.log('PowerShellUnit.constructor');
};

PowerShellUnit.prototype.executeAction = function(name) {
	PowerShellUnit.super.executeAction.call(this, name); 
	console.log('PowerShellUnit. executeAction'); 
	var action =  this._actions[name.toLowerCase()];
	action.execute(name);
}

PowerShellUnit.prototype.getDeployUnitInfo = function() {
	console.log('PowerShellUnit. getDeployUnitInfo'); 
		return PowerShellUnit.super._getDeployUnitInfo.call(this); 
	}

//Add properties that should overide deployunit after this row
util.inherits(PowerShellUnit, deployunit);

 PowerShellUnit.prototype._loadTasks =  function(name) {
		this._actions = {};
		this._actions.Start =  this._server.tasks.windowsservicestarttask;
		this._actions.Stop = this._server.tasks.windowsservicestoptask;
		this._actions.Deploy = this._server.tasks.windowsservicedeploytask;
		this._actions.Apply = this._server.tasks.windowsserviceapplytask;
 }

 PowerShellUnit.prototype.getUnitType =  function() {
  console.log("PowerShellUnit: getUnitType");
  return "hallonkola";
};


module.exports =  PowerShellUnit;