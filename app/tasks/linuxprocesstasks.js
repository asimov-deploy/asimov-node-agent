var sys = require('sys');
var exec = require('child_process').exec;
var util = require('util');
var shell = require('shelljs');
var events = require('events');
var unitStatusChangedEvent = require('../events/unitstatuschangedevent');
var CommandExecutor =  require('../commandexecutor').CommandExecutor;
var commandExecutor =  new CommandExecutor();

var LinuxProcessTasks = function() {
		events.EventEmitter.call(this);
};

	LinuxProcessTasks.prototype.__proto__ = events.EventEmitter.prototype;

	LinuxProcessTasks.prototype.start =  function (command) {
		console.log("Start task : " + command.actionName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Starting'});
		var commandToExecute = util.format('service %s status | grep "not running" |  if [ $(wc -c) -gt "0" ]; then service %s start; fi; service --status-all | grep %s 2>&1 | grep  -Po "[\\+\\-\\?]"', command.serviceName, command.serviceName, command.serviceName);
		commandExecutor.executeShellCommand(commandToExecute,command.app, function(status){
				console.log(status);
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))};	

	LinuxProcessTasks.prototype.stop =  function (command) {
		console.log("Stop task : " + command.actionName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Stopping'});
		var commandToExecute = util.format('service %s stop; service --status-all | grep %s 2>&1 | grep  -Po "[\\+\\-\\?]"', command.serviceName, command.serviceName);
		commandExecutor.executeShellCommand(commandToExecute,command.app, function(status){
				console.log(status);
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))};	
	
  LinuxProcessTasks.prototype.status =  function (command, callback) {
		console.log("Start task : " + command.actionName);
		var commandToExecute = util.format('service --status-all | grep %s 2>&1 | grep  -Po "[\\+\\-\\?]"', command.serviceName);
		commandExecutor.executeShellCommand(commandToExecute,command.app, callback);
	};

	LinuxProcessTasks.prototype.command =  function (command) {
		console.log("Execute task : " + command.actionName);
		var commandToExecute = command.command;
		commandExecutor.executeShellCommand(commandToExecute,command.app);
	};

	LinuxProcessTasks.prototype.longrunningcommand =  function (command) {
		console.log("Execute task : " + command.actionName);
		var commandToExecute = command.command;
		commandExecutor.executeLongRunningShellCommand(commandToExecute,command.app);
	};

module.exports =  LinuxProcessTasks;




