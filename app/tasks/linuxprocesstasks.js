var sys = require('sys');
var exec = require('child_process').exec;
var util = require('util');
var shell = require('shelljs');
var events = require('events');
var unitStatusChangedEvent = require('../events/unitstatuschangedevent');

function executeShellCommand(commandToExecute,server, callback) {
	console.log(commandToExecute);
	var child = exec(commandToExecute, function (error, stdout, stderr) {
		var message = {
			agentName: server.config.getAgent().name,
			level: "info",
			message: stdout
		};
		server.eventSender.sendagentlog(message);

		if (typeof(callback) == "function") callback(stdout);
	})
}

function executeLongRunningShellCommand(commandToExecute,server) {
	console.log("executeLongRunningShellCommand :" + commandToExecute);
	var message = {
			agentName: server.config.getAgent().name,
			level: "info",
			message: "message"
		};

	var child = exec(commandToExecute, {async:true});
	child.stdout.on('data', function(data) {
	console.log("standard Data: " + data);
				message.message = data;
				server.eventSender.sendagentlog(message);
	});	
}

var LinuxProcessTasks = function() {
		events.EventEmitter.call(this);events.EventEmitter.call(this);
    this.executeShellCommand =  executeShellCommand;
    this.executeLongRunningShellCommand =  executeLongRunningShellCommand;
};

	LinuxProcessTasks.prototype.__proto__ = events.EventEmitter.prototype;

	LinuxProcessTasks.prototype.init =  function(server){
		this.server = server;
		this.executeShellCommand = executeShellCommand;
	};

	LinuxProcessTasks.prototype.start =  function (command) {
		console.log("Start task : " + command.actionName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Starting'});
		var commandToExecute = util.format('service %s status | grep "not running" |  if [ $(wc -c) -gt "0" ]; then service %s start; fi; service --status-all | grep %s 2>&1 | grep  -Po "[\\+\\-\\?]"', command.serviceName, command.serviceName, command.serviceName);
		executeShellCommand(commandToExecute,command.server, function(status){
				console.log(status);
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))};	

	LinuxProcessTasks.prototype.stop =  function (command) {
		console.log("Stop task : " + command.actionName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Stopping'});
		var commandToExecute = util.format('service %s stop; service --status-all | grep %s 2>&1 | grep  -Po "[\\+\\-\\?]"', command.serviceName, command.serviceName);
		executeShellCommand(commandToExecute,command.server, function(status){
				console.log(status);
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))};	
	
  LinuxProcessTasks.prototype.status =  function (command, callback) {
		console.log("Start task : " + command.actionName);
		var commandToExecute = util.format('service --status-all | grep %s 2>&1 | grep  -Po "[\\+\\-\\?]"', command.serviceName);
		executeShellCommand(commandToExecute,command.server, callback);
	};

	LinuxProcessTasks.prototype.command =  function (command) {
		console.log("Execute task : " + command.actionName);
		var commandToExecute = command.command;
		executeShellCommand(commandToExecute,command.server);
	};

	LinuxProcessTasks.prototype.longrunningcommand =  function (command) {
		console.log("Execute task : " + command.actionName);
		var commandToExecute = command.command;
		executeLongRunningShellCommand(commandToExecute,command.server);
	};

module.exports =  LinuxProcessTasks;




