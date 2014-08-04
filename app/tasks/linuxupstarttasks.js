var sys = require('sys');
var exec = require('child_process').exec;
var util = require('util');
var shell = require('shelljs');
var events = require('events');
var unitStatusChangedEvent = require('../events/unitstatuschangedevent');

function executeShellCommand(commandToExecute,server, callback) {
	console.log(commandToExecute);
	//var child = exec(commandToExecute, function (error, stdout, stderr) {
			var message = {
			agentName: server.config.getAgent().name,
			level: "info",
			message: "stop"
		};
		server.eventSender.sendagentlog(message);

	
		if (typeof(callback) == "function") callback("stop");
	//})
}

var LinuxUpstartTasks = function() {
		events.EventEmitter.call(this);
    this.executeShellCommand =  executeShellCommand;
};
	LinuxUpstartTasks.prototype.__proto__ = events.EventEmitter.prototype;

	LinuxUpstartTasks.prototype.start =  function (command) {
		console.log("Start task : " + command.actionName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Starting'});
		var commandToExecute = util.format('start %s ; status %s 2>&1', command.serviceName, command.serviceName);
		executeShellCommand(commandToExecute,command.server, function(status){
				console.log(status);
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))};	

	LinuxUpstartTasks.prototype.stop =  function (command) {
		console.log("Stop task : " + command.actionName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Stopping'});
		var commandToExecute = util.format('stop %s ; status %s 2>&1', command.serviceName, command.serviceName);
		executeShellCommand(commandToExecute,command.server, function(status){
				console.log(status);
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))};	
	
  LinuxUpstartTasks.prototype.status =  function (command, callback) {
		console.log("Start task : " + command.actionName);
		var commandToExecute = util.format('status %s  2>&1 ', command.serviceName);
		executeShellCommand(commandToExecute,command.server, callback);
	};

	LinuxUpstartTasks.prototype.restart =  function (command) {
	console.log("Stop task : " + command.actionName);
	this.emit("statusChanged", {'name':	command.unitName, 'status': 'Stopping'});
	var commandToExecute = util.format('restart %s ; status %s ', command.serviceName, command.serviceName);
	executeShellCommand(commandToExecute,command.server, function(status){
			console.log(status);
			this.emit("statusChanged", {'name':	command.unitName, 'status': status});
	}.bind(this))};	


module.exports =  LinuxUpstartTasks;




