var exec = require('child_process').exec;
var util = require('util');
var events = require('events');
var unitStatusChangedEvent = require('../events/unitstatuschangedevent');

function executePSCommand(commandToExecute,server, callback ){
	console.log("Command to execute: " + commandToExecute);

  exec(commandToExecute,{maxBuffer: 500*1024},function(err, stdout, stderr) {
			if (typeof(callback) == "function") callback(stdout);
    }).stdin.end();
	}

	var WindowsServiceTasks = function() {
			events.EventEmitter.call(this);
			this.executePSCommand =  executePSCommand;
	};

	WindowsServiceTasks.prototype.__proto__ = events.EventEmitter.prototype;

  WindowsServiceTasks.prototype.start = function(command) {
		console.log("Start windows service : " + command.unitName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Starting'});
		var commandToExecute = 'powershell.exe -Command "(get-service -Name "' + command.serviceName + '"  -ErrorAction SilentlyContinue ).Start();  write-host (get-service -Name "' + command.serviceName + '" ).Status "';
		executePSCommand(commandToExecute,command.server, function(status){
				console.log(status);
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this));	
  };

  WindowsServiceTasks.prototype.stop = function(command) {
		console.log("Stop windows service : " + command.unitName);
		this.emit("statusChanged", {'name':	command.unitName, 'status': 'Stopping'});
		var commandToExecute = 'powershell.exe -Command (get-service -Name ' + command.serviceName + '  -ErrorAction SilentlyContinue ).Stop(); write-host (get-service -Name "' + command.serviceName + '" ).Status ';
		executePSCommand(commandToExecute,command.server, function(status){
				this.emit("statusChanged", {'name':	command.unitName, 'status': status});
				console.log(status);
		}.bind(this));
	};
	
	WindowsServiceTasks.prototype.status =function (command, callback) {
		console.log("Get status task : " + command.actionName);
		var commandToExecute = 'powershell.exe -Command "if((get-service -Name ' + command.serviceName + ' -ErrorAction SilentlyContinue )){ write-host (get-service -Name "' + command.serviceName + '").Status } else{ Write-host \"NA\" }"';
		executePSCommand(commandToExecute,command.server, callback );
	};

	WindowsServiceTasks.prototype.apply = function(command) {
		console.log("Apply puppet : " + command.actionName);
		var commandToExecute = 'powershell.exe -Command puppet agent -t"';
		executePSCommand(commandToExecute);
	};

	WindowsServiceTasks.prototype.command = function(command) {
		console.log("Execute command : " + command.actionName + " - " + command.unitName);
		var commandToExecute = util.format('powershell.exe -Command %s', command.command);
		executePSCommand(commandToExecute,command.server);
	};

module.exports =  WindowsServiceTasks;