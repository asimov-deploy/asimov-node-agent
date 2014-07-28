var exec = require('child_process').exec;
var util = require('util');

var executePSCommand = function(commandToExecute){
	console.log("Command to execute: " + commandToExecute);

  exec(commandToExecute, function(err, stdout, stderr) {
    console.log(stdout);
    })
			.stdin.end();
	};

module.exports = {
  start: function(command) {
	  console.log("Start windows service : " + command.unitName);
  	var commandToExecute = 'powershell.exe -Command "(get-service -Name ' + command.serviceName + ').Start()"';
  	executePSCommand(commandToExecute);	
  },
  stop: function(command) {
  	console.log("Stop windows service : " + command.unitName);
  	var commandToExecute = 'powershell.exe -Command "(get-service -Name ' + command.serviceName + ').Stop()"';
		executePSCommand(commandToExecute);
	},
	apply: function(command) {
	  console.log("Apply puppet : " + command.actionName);
	  var commandToExecute = 'powershell.exe -Command puppet agent -t"';
	  executePSCommand(commandToExecute);
	},
	command: function(command) {
	  console.log("Execute command : " + command.actionName + " - " + command.unitName);
		var commandToExecute = util.format('powershell.exe -Command %s', command.command);
	  executePSCommand(commandToExecute);
	},
};