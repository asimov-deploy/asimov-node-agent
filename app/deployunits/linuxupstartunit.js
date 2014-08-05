var util = require('util');
var _ = require('underscore');
var deployunit = require("./deployunit");
var unitStatusChangedEvent = require('../events/unitstatuschangedevent');

var LinuxUpstartUnit = function(server, name) {
    LinuxUpstartUnit.super_.call(this,server, name); // call deployunit's constructor
    console.log("Inside Upstart Unit!")
    this._requriredPlatform ="linux";
    this.defaultActions = ["Start", "Stop", "Restart"];
    var Tasks =	server.tasks.linuxupstarttasks;
		this._Tasks = new Tasks();
    this._loadTasks();

		var _statusChangedHandler = function(data){
				var statusText = this.getStatusText(data.status);
				this._server.eventSender.sendagentlog({"level": "info", "message": statusText});
				var evt = new unitStatusChangedEvent(this._name, statusText);
				this._server.eventSender.sendEvent(evt);
		};
	
		this.on('statusChanged', _statusChangedHandler);
};
//Add properties that should overide deployunit after this row
util.inherits(LinuxUpstartUnit, deployunit);

LinuxUpstartUnit.prototype.executeAction = function(params) {
	LinuxUpstartUnit.super_.prototype.executeAction.call(this, params); 
};

LinuxUpstartUnit.prototype.getStatusText = function(text) {
			var statusText ="NA";

			if(text.indexOf("start") != -1)			statusText = "Running";
			if(text.indexOf("stop") != -1)			statusText = "Stopped";
			console.log("UPstart ParseStatusText: " + text + " | Actual statusText: " + statusText);
			
			return statusText;
 };

 LinuxUpstartUnit.prototype._loadTasks =  function() {
		this._actions.start =  this._Tasks.start.bind(this);
		this._actions.stop = this._Tasks.stop.bind(this);
		this._actions.status = this._Tasks.status.bind(this);
		this._actions.deploy = function(deployunit, params){ console.log("Deploy : "  + params.actionName)}  ;
		this._actions.restart = this._Tasks.restart.bind(this);
 }

module.exports =  LinuxUpstartUnit;