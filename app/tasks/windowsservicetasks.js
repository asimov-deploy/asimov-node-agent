var exec = require('child_process').exec;
var util = require('util');

var executePSCommand = function(commandToExecute,server){
	console.log("Command to execute: " + commandToExecute);

  exec(commandToExecute, function(err, stdout, stderr) {
    console.log(stdout);
    var message = {
			agentName: server.config.getAgent().name,
			level: 'info',
			message: stdout
		};
		server.eventSender.sendagentlog(message);
    })
			.stdin.end();
	};

module.exports = {
  start: function(command) {
	  console.log("Start windows service : " + command.unitName);
  	var commandToExecute = 'powershell.exe -Command "(get-service -Name ' + command.serviceName + ').Start()"';
  	executePSCommand(commandToExecute,command.server);	
  },
  stop: function(command) {
  	console.log("Stop windows service : " + command.unitName);
  	var commandToExecute = 'powershell.exe -Command "(get-service -Name ' + command.serviceName + ').Stop()"';
		executePSCommand(commandToExecute,command.server);
	},
	apply: function(command) {
	  console.log("Apply puppet : " + command.actionName);
	  var commandToExecute = 'powershell.exe -Command puppet agent -t"';
	  executePSCommand(commandToExecute);
	},
	command: function(command) {
	  console.log("Execute command : " + command.actionName + " - " + command.unitName);
		var commandToExecute = util.format('powershell.exe -Command %s', command.command);
	  executePSCommand(commandToExecute,command.server);
	},
};