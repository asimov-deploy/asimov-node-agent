var exec = require('child_process').exec;
module.exports = {
  execute: function(actionName) {
  console.log("Apply task : " + actionName);
  exec('powershell.exe -Command "echo calle"', function(err, stdout, stderr) {
    console.log(stdout);
    })
			.stdin.end();
		}
};