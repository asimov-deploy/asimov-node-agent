var util = require("util");
var deployunit = require("./deployunit");
var PowerShellUnit = function(server, name) {
    PowerShellUnit.super_.call(this,server, name); // call deployunit's constructor
    this._requriredPlatform ="win32";
    this._loadTasks();
};

PowerShellUnit.prototype.executeAction = function(name) {
	PowerShellUnit.super.executeAction.call(this, name); 
	var action =  this._actions[name.toLowerCase()];
	action.execute(name);
}

//Add properties that should overide deployunit after this row
util.inherits(PowerShellUnit, deployunit);

PowerShellUnit.prototype.getDeployUnitInfo = function(callback) {
	var deployUnitInfo =  PowerShellUnit.super_.prototype.getDeployUnitInfo.call(this); 
	return (callback(deployUnitInfo)); 
}


 PowerShellUnit.prototype._loadTasks =  function(name) {
		this._actions = {};
		/*this._actions.Start =  this._server.tasks.windowsservicestarttask;
		this._actions.Stop = this._server.tasks.windowsservicestoptask;
		this._actions.Deploy = this._server.tasks.windowsservicedeploytask;
		this._actions.Apply = this._server.tasks.windowsserviceapplytask; */
 }

 
module.exports =  PowerShellUnit;