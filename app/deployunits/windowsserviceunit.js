var util = require('util');
var _ = require('underscore');
var deployunit = require("./deployunit");
var defaulttasks = require('../tasks/windowsservicetasks');

var WindowsServiceUnit = function(server, name) {
    WindowsServiceUnit.super_.call(this,server, name); // call deployunit's constructor
    this.defaultActions = ["Start", "Stop"];
    this._requriredPlatform ="win32";
    this._loadTasks();
};

//Add properties that should overide deployunit after this row
util.inherits(WindowsServiceUnit, deployunit);

WindowsServiceUnit.prototype.executeAction = function(params) {
	WindowsServiceUnit.super_.prototype.executeAction.call(this, params); 
};

WindowsServiceUnit.prototype.getDeployUnitInfo = function(callback) {
	var deployUnitInfo =  WindowsServiceUnit.super_.prototype.getDeployUnitInfo.call(this); 

	if(this._requriredPlatform !== process.platform) return (callback(deployUnitInfo));

	var command = {};
	command.server = this._server;
	command.serviceName = this._serviceName;
	command.actionName = "Status";
	this._actions.status(command,  function(status){

			var statusText ="NA";
			if(status.indexOf("Running") != -1) statusText = "Running";

			if(status.indexOf("Stopped") != -1) statusText = "Stopped";
			
			deployUnitInfo.status = statusText;
			//return deployUnitInfo;
			callback(deployUnitInfo)	
			});
 }

 WindowsServiceUnit.prototype._loadTasks =  function(name) {
		this._actions.start =  defaulttasks.start;
		this._actions.stop = defaulttasks.stop;
		this._actions.status = defaulttasks.status;
		this._actions.deploy = function(deployunit, params){ console.log("Deploy : "  + params.actionName)}  ;
		this._actions.command = defaulttasks.command;
 }

module.exports =  WindowsServiceUnit;