var util = require('util');
var _ = require('underscore');
var deployunit = require("./deployunit");
var defaulttasks = require('../tasks/windowsservicetasks');

var WindowsServiceUnit = function(server, name) {
    WindowsServiceUnit.super_.call(this,server, name); // call deployunit's constructor
    this.defaultActions = ["Start", "Stop"];
    this._loadTasks();
};

//Add properties that should overide deployunit after this row
util.inherits(WindowsServiceUnit, deployunit);

WindowsServiceUnit.prototype.executeAction = function(params) {
	WindowsServiceUnit.super_.prototype.executeAction.call(this, params); 
};

WindowsServiceUnit.prototype.getDeployUnitInfo = function() {
	var deployUnitInfo =  WindowsServiceUnit.super_.prototype.getDeployUnitInfo.call(this); 
	return deployUnitInfo;
 }

 WindowsServiceUnit.prototype._loadTasks =  function(name) {
		this._actions.start =  defaulttasks.start;
		this._actions.stop = defaulttasks.stop;
		this._actions.deploy = function(deployunit, params){ console.log("Deploy : "  + params.actionName)}  ;
		this._actions.command = defaulttasks.command;
 }

module.exports =  WindowsServiceUnit;