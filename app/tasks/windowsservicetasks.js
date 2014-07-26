var exec = require('child_process').exec;
module.exports = {
  start: function(deployUnit, command) {
  console.log("Start windows service : " + command.actionName);
  var commandToExcecute = 'powershell.exe -Command "(get-service -Name ' + command.unitName + ').Start()"';
  exec(commandToExcecute, function(err, stdout, stderr) {
    console.log(stdout);
    })
			.stdin.end();
		},

  stop: function(deployUnit, command) {
  console.log("Stop windows service : " + command.actionName);
  var commandToExcecute = 'powershell.exe -Command "(get-service -Name ' + command.unitName + ').Stop()"';
  exec(commandToExcecute, function(err, stdout, stderr) {
    console.log(stdout);
    })
			.stdin.end();
		},

	apply: function(deployUnit, command) {
  console.log("Apply puppet : " + command.actionName);
  var commandToExcecute = 'powershell.exe -Command puppet agent -t"';
  exec(commandToExcecute, function(err, stdout, stderr) {
    console.log(stdout);
    })
			.stdin.end();
		},
};