var sys = require('sys');
var exec = require('child_process').exec;
var child;

var executeShellCommand = function(commandToExecute){
  child = exec(commandToExecute, function (error, stdout, stderr) {
		sys.print('stdout: ' + stdout);
		sys.print('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
		});
};

module.exports = {
  start: function (actionName) {
  console.log("Stop task : " + actionName);
  var commandToExecute = "";
  executeShellCommand(commandToExecute);
	// executes puppet agent -t
	
	},
	stop: function (actionName) {
  console.log("Stop task : " + actionName);
	var commandToExecute = "service puppet stop";
  executeShellCommand(commandToExecute);
	},
	
	apply: function (actionName) {
	console.log("Apply task : " + actionName);
	var commandToExecute = "puppet agent -t";
  executeShellCommand(commandToExecute);
	}
	
};






