var util = require('util');
var _ = require('underscore');
var deployunit = require("./deployunit");
var unitStatusChangedEvent = require('../events/unitstatuschangedevent');

var LinuxProcessUnit = function(server, name) {
    LinuxProcessUnit.super_.call(this,server, name); // call deployunit's constructor
    this._requriredPlatform ="linux";
    this.defaultActions = ["Start", "Stop"];
    var Tasks =	server.tasks.linuxprocesstasks;
		this._Tasks = new Tasks();
    this._loadTasks(server);

		var _statusChangedHandler = function(data){
				var statusText = this.getStatusText(data.status);
				this._server.eventSender.sendagentlog({"level": "info", "message": statusText});
				var evt = new unitStatusChangedEvent(this._name, statusText);
				this._server.eventSender.sendEvent(evt);
		};
	
		this.on('statusChanged', _statusChangedHandler);
};

//Add properties that should overide deployunit after this row
util.inherits(LinuxProcessUnit, deployunit);

LinuxProcessUnit.prototype.executeAction = function(params) {
	LinuxProcessUnit.super_.prototype.executeAction.call(this, params); 
};

LinuxProcessUnit.prototype.getStatusText = function(text) {
			var statusText ="NA";

			if(text.indexOf("+") != -1)			statusText = "Running";
			if(text.indexOf("-") != -1)			statusText = "Stopped";
			console.log("ParseStatusText: " + text + " | Actual statusText: " + statusText);
			
			return statusText;
 };

 LinuxProcessUnit.prototype._loadTasks =  function() {
		this._actions.start =  this._Tasks.start.bind(this);
		this._actions.stop = this._Tasks.stop.bind(this);
		this._actions.status = this._Tasks.status.bind(this);
		this._actions.deploy = function(deployunit, params){ console.log("Deploy : "  + params.actionName)}  ;
		this._actions.command = this._Tasks.command.bind(this);
		this._actions.longrunningcommand = this._Tasks.longrunningcommand.bind(this);
 }

module.exports =  LinuxProcessUnit;