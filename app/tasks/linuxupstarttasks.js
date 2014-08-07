var events = require('events');
var unitStatusChangedEvent = require('../events/unitstatuschangedevent');
var unitStatusChangedEvent = require('../events/unitstatuschangedevent');
var CommandExecutor =  require('../commandexecutor').CommandExecutor;
var commandExecutor =  new CommandExecutor();


var LinuxUpstartTasks = function() {
		events.EventEmitter.call(this);
};

	LinuxUpstartTasks.prototype.__proto__ = events.EventEmitter.prototype;

	LinuxUpstartTasks.prototype.start =  function (command) {
		console.log("Start task : " + command.actionName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Starting'});
		var commandToExecute = util.format('start %s ; status %s 2>&1', command.serviceName, command.serviceName);
		commandExecutor.executeShellCommand(commandToExecute,command.app, function(status){
				console.log(status);
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))
	};	

	LinuxUpstartTasks.prototype.stop =  function (command) {
		console.log("Stop task : " + command.actionName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Stopping'});
		var commandToExecute = util.format('stop %s ; status %s 2>&1', command.serviceName, command.serviceName);
		commandExecutor.executeShellCommand(commandToExecute,command.app, function(status){
				console.log(status);
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))
	};	
	
  LinuxUpstartTasks.prototype.status =  function (command, callback) {
		console.log("Status task : " + command.actionName);
		var commandToExecute = util.format('status %s  2>&1 ', command.serviceName);
		commandExecutor.executeShellCommand(commandToExecute,command.app, callback);
	};

	LinuxUpstartTasks.prototype.restart =  function (command) {
	console.log("Restart task : " + command.actionName);
	this.emit("statusChanged", {'name':	command.unitName, 'status': 'Stopping'});
	var commandToExecute = util.format('restart %s ; status %s ', command.serviceName, command.serviceName);
	commandExecutor.executeShellCommand(commandToExecute,command.app, function(status){
			console.log(status);
			this.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))
	};	

module.exports =  LinuxUpstartTasks;




