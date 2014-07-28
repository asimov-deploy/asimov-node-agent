var sys = require('sys');
var exec = require('child_process').exec;
var util = require('util');
var shell = require('shelljs');

	function executeShellCommand(commandToExecute,server) {
	console.log(commandToExecute);
	var child = exec(commandToExecute, function (error, stdout, stderr) {
		sys.print('stdout: ' + stdout);
		var message = {
			agentName: 'hubba',
			level: 'warn',
			message: stdout
		};
		server.eventSender.sendagentlog(message);

		sys.print('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	})
	};

	function executeLongRunningShellCommand(commandToExecute,server) {
	console.log("executeLongRunningShellCommand :" + commandToExecute);
	var message = {
			agentName: server.config.getAgent().name,
			level: 'info',
			message: "message"
		};

	var child = exec(commandToExecute, {async:true});
	child.stdout.on('data', function(data) {
	  console.log("standard Data: " + data);
				message.message = data;
				server.eventSender.sendagentlog(message);
	});
	
};


var LinuxProcessTasks = function() {
    this.executeShellCommand =  executeShellCommand;
    this.executeLongRunningShellCommand =  executeLongRunningShellCommand;
};

	LinuxProcessTasks.prototype.init =  function(server){
		this.server = server;
		this.executeShellCommand = executeShellCommand;
	};

  LinuxProcessTasks.prototype.start =  function (command) {
  	console.log("Start task : " + command.actionName);
  	var commandToExecute = util.format('service %s status | grep "not running" |  if [ $(wc -c) -gt "0" ]; then service %s start; fi', command.serviceName, command.serviceName);
  	executeShellCommand(commandToExecute,command.server);
	};

	LinuxProcessTasks.prototype.stop =  function (command) {
  	console.log("Stop task : " + command.actionName);
		var commandToExecute = util.format('service %s stop', command.serviceName);
  	executeShellCommand(commandToExecute,command.server);
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




