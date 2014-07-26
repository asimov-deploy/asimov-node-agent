var sys = require('sys');
var exec = require('child_process').exec;
var child;

module.exports = {
  start: function (actionName) {
  console.log("Stop task : " + actionName);
	// executes puppet agent -t
	child = exec("service puppet start", function (error, stdout, stderr) {
		sys.print('stdout: ' + stdout);
		sys.print('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
		});
	},
	stop: function (actionName) {
  console.log("Stop task : " + actionName);
	// executes puppet agent -t
	child = exec("service puppet stop", function (error, stdout, stderr) {
		sys.print('stdout: ' + stdout);
		sys.print('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
		});
	},
	
	apply: function (actionName) {
	console.log("Apply task : " + actionName);
	// executes puppet agent -t
	child = exec("puppet agent -t", function (error, stdout, stderr) {
		sys.print('stdout: ' + stdout);
		sys.print('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
		});
	}
	
};






