var util = require("util");
var deployunit = require("./deployunit");
var PowerShellUnit = function(app, name) {
    PowerShellUnit.super_.call(this,app, name); // call deployunit's constructor
    this._requriredPlatform ="win32";
    this._hasStatus = false;
    this._loadTasks();
};

PowerShellUnit.prototype.executeAction = function(name) {
	PowerShellUnit.super.executeAction.call(this, name); 
	var action =  this._actions[name.toLowerCase()];
	action.execute(name);
}
//Add properties that should overide deployunit after this row
util.inherits(PowerShellUnit, deployunit);

 PowerShellUnit.prototype._loadTasks =  function(name) {
		this.deploy = function (deployunit, params){ console.log("Deploy : "  + params.actionName)}  ;
 }

module.exports =  PowerShellUnit;