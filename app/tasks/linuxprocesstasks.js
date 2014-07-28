var sys = require('sys');
var exec = require('child_process').exec;
var util = require('util');
var child;

var executeShellCommand = function (commandToExecute) {
	child = exec(commandToExecute, function (error, stdout, stderr) {
		sys.print('stdout: ' + stdout);
		sys.print('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
};

module.exports = {
  start: function (command) {
  	console.log("Start task : " + command.actionName);
  	var commandToExecute = util.format('service %s start', command.serviceName);
  	executeShellCommand(commandToExecute);
	},

	stop: function (command) {
  	console.log("Stop task : " + command.actionName);
		var commandToExecute = util.format('service %s stop', command.serviceName);
  	executeShellCommand(commandToExecute);
	},
	
	command: function (command) {
		console.log("Execute task : " + command.actionName);
		var commandToExecute = command.command;
  	executeShellCommand(commandToExecute);
	}
	
};






