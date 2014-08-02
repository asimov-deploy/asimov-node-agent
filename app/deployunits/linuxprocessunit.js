var util = require('util');
var _ = require('underscore');
var deployunit = require("./deployunit");

var LinuxProcessUnit = function(server, name) {
    LinuxProcessUnit.super_.call(this,server, name); // call deployunit's constructor
    this._requriredPlatform ="linux";
    this.defaultActions = ["Start", "Stop"];
    this._loadTasks(server);
};

//Add properties that should overide deployunit after this row
util.inherits(LinuxProcessUnit, deployunit);

LinuxProcessUnit.prototype.executeAction = function(params) {
	LinuxProcessUnit.super_.prototype.executeAction.call(this, params); 
};

LinuxProcessUnit.prototype.getDeployUnitInfo = function(callback) {
	var deployUnitInfo =  LinuxProcessUnit.super_.prototype.getDeployUnitInfo.call(this); 

	if(this._requriredPlatform !== process.platform) return (callback(deployUnitInfo));

	var command = {};
	command.server = this._server;
	command.serviceName = this._serviceName;
	command.actionName = "Status";
	this._actions.status(command,  function(status){
			deployUnitInfo.status = status;
			callback(deployUnitInfo)	
	});
}

 LinuxProcessUnit.prototype._loadTasks =  function(server) {
		var Tasks =	server.tasks.linuxprocesstasks;
		var defaulttasks = new Tasks();
		this._actions.start =  defaulttasks.start;
		this._actions.stop = defaulttasks.stop;
		this._actions.status = defaulttasks.status;
		this._actions.deploy = function(deployunit, params){ console.log("Deploy : "  + params.actionName)}  ;
		this._actions.command = defaulttasks.command;
		this._actions.longrunningcommand = defaulttasks.longrunningcommand;
 }

module.exports =  LinuxProcessUnit;