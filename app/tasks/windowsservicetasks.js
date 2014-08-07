
var util = require('util');
var events = require('events');
var unitStatusChangedEvent = require('../events/unitstatuschangedevent');
var CommandExecutor =  require('../commandexecutor').CommandExecutor;
var commandExecutor =  new CommandExecutor();

	var WindowsServiceTasks = function() {
			events.EventEmitter.call(this);
	};

	WindowsServiceTasks.prototype.__proto__ = events.EventEmitter.prototype;

  WindowsServiceTasks.prototype.start = function(command) {
		console.log("Start windows service : " + command.unitName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Starting'});
		var commandToExecute = 'powershell.exe -Command "(get-service -Name "' + command.serviceName + '"  -ErrorAction SilentlyContinue ).Start();  write-host (get-service -Name "' + command.serviceName + '" ).Status "';
		commandExecutor.executePSCommand(commandToExecute,command.app, function(status){
				console.log(status);
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this));	
  };

  WindowsServiceTasks.prototype.stop = function(command) {
		console.log("Stop windows service : " + command.unitName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Stopping'});
		var commandToExecute = 'powershell.exe -Command (get-service -Name ' + command.serviceName + '  -ErrorAction SilentlyContinue ).Stop(); write-host (get-service -Name "' + command.serviceName + '" ).Status ';
		commandExecutor.executePSCommand(commandToExecute,command.app, function(status){
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
				console.log(status);
		}.bind(this));
	};
	
	WindowsServiceTasks.prototype.status =function (command, callback) {
		console.log("Get status task : " + command.actionName);
		var commandToExecute = 'powershell.exe -Command "if((get-service -Name ' + command.serviceName + ' -ErrorAction SilentlyContinue )){ write-host (get-service -Name "' + command.serviceName + '").Status } else{ Write-host \"NA\" }"';
		try
		{
			commandExecutor.executePSCommand(commandToExecute,command.app, callback );
		}
		catch (e)
		{
			console.log(e);
		}
	};

	WindowsServiceTasks.prototype.apply = function(command) {
		console.log("Apply puppet : " + command.actionName);
		var commandToExecute = 'powershell.exe -Command puppet agent -t"';
		commandExecutor.executePSCommand(commandToExecute);
	};

	WindowsServiceTasks.prototype.command = function(command) {
		console.log("Execute command : " + command.actionName + " - " + command.unitName);
		var commandToExecute = util.format('powershell.exe -Command %s', command.command);
		commandExecutor.executePSCommand(commandToExecute,command.app);
	};

module.exports =  WindowsServiceTasks;