var util = require('util');
var _ = require('underscore');
var deployunit = require("./deployunit");
var unitStatusChangedEvent = require('../events/unitstatuschangedevent');

var WindowsServiceUnit = function(server, name) {
    WindowsServiceUnit.super_.call(this,server, name); // call deployunit's constructor
    this.defaultActions = ["Start", "Stop"];
    this._requriredPlatform ="win32";
    var Tasks =	server.tasks.windowsservicetasks;
		this._Tasks = new Tasks();
    this._loadTasks();
    
    var _getStatusText = function(text)
    {
			var statusText ="NA";
			if(text.indexOf("Running") != -1) statusText = "Running";
			if(text.indexOf("Stopped") != -1) statusText = "Stopped";
			if(text.indexOf("Starting") != -1) statusText = "Starting";
			if(text.indexOf("Stopping") != -1) statusText = "Stopping";
			if(text.indexOf("StopPending") != -1) statusText = "Stopped";

			return statusText;
    }

    var _statusChangedHandler = function(data){
				var statusText = _getStatusText(data.status);
				this._server.eventSender.sendagentlog({"level": "info", "message": statusText});

				var evt = new unitStatusChangedEvent(this._name, statusText);
				this._server.eventSender.sendEvent(evt);
		};
	
		this.on('statusChanged', _statusChangedHandler);
    
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

			var statusText = _getStatusText(data.status);

			deployUnitInfo.status = statusText;
			
			//this.emit("statusChanged", deployUnitInfo);
			
			callback(deployUnitInfo);

			}.bind(this));

 }

 WindowsServiceUnit.prototype._loadTasks =  function() {
 
		this._actions.start =  this._Tasks.start.bind(this);
		this._actions.stop = this._Tasks.stop.bind(this);
		this._actions.status = this._Tasks.status.bind(this);
		this._actions.deploy = function(deployunit, params){ console.log("Deploy : "  + params.actionName)}  ;
		this._actions.command = this._Tasks.command.bind(this);
 }

module.exports =  WindowsServiceUnit;