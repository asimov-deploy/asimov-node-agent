var exec = require('child_process').exec;
var shell = require('shelljs');


function  CommandExecutor(){}

CommandExecutor.prototype.executePSCommand = function(commandToExecute,app, callback ){
	console.log("Command to execute: " + commandToExecute);

  exec(commandToExecute,{maxBuffer: 500*1024},function(err, stdout, stderr) {
		if(err) console.log(err +  stderr);
			if (typeof(callback) == "function") callback(stdout);
		}).stdin.end();
	};

CommandExecutor.prototype.executeShellCommand = function (commandToExecute,app, callback) {
	console.log(commandToExecute);
	var child = exec(commandToExecute, function (error, stdout, stderr) {
		if (typeof(callback) == "function") callback(stdout);
	})
}
CommandExecutor.prototype.executeLongRunningShellCommand = function (commandToExecute,app) {
	console.log("executeLongRunningShellCommand :" + commandToExecute);
	
	var child = exec(commandToExecute, {async:true});
	child.stdout.on('data', function(data) {
	console.log("standard Data: " + data);
	var message = {
				level: "debug",
				message: data
				};
				app.eventSender.sendagentlog(message);
	});	
}


module.exports = {
	CommandExecutor: CommandExecutor
};
