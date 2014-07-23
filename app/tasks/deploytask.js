var exec = require('child_process').exec;

// List a directory

module.exports = {
	execute: function(command) {
			console.log("Deploy task : "+command.actionName);
			exec('powershell.exe -Command "echo calle"', function(err, stdout, stderr) {
			  console.log(stdout);
			})
			.stdin.end();
		}
};