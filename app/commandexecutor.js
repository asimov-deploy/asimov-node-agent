var exec = require('child_process').exec;
var shell = require('shelljs');


function  CommandExecutor(){}

CommandExecutor.prototype.executePSCommand = function(commandToExecute,server, callback ){
	console.log("Command to execute: " + commandToExecute);

  exec(commandToExecute,{maxBuffer: 500*1024},function(err, stdout, stderr) {
		if(err) console.log(err +  stderr);
			if (typeof(callback) == "function") callback(stdout);
		}).stdin.end();
	};

CommandExecutor.prototype.executeShellCommand = function (commandToExecute,server, callback) {
	console.log(commandToExecute);
	var child = exec(commandToExecute, function (error, stdout, stderr) {
		if (typeof(callback) == "function") callback(stdout);
	})
}
CommandExecutor.prototype.executeLongRunningShellCommand = function (commandToExecute,server) {
	console.log("executeLongRunningShellCommand :" + commandToExecute);
	
	var child = exec(commandToExecute, {async:true});
	child.stdout.on('data', function(data) {
	console.log("standard Data: " + data);
				message.message = data;
				server.eventSender.sendagentlog(message);
	});	
}


module.exports = {
	CommandExecutor: CommandExecutor
};