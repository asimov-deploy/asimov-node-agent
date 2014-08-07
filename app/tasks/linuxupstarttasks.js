
var unitStatusChangedEvent = require('../events/unitstatuschangedevent');

module.exports =  function (obj){

	obj.start =  function (command) {
		console.log("Start task : " + command.actionName);
		this._eventEmitter.emit("statusChanged", {'name':	command.unitName, 'status': 'Starting'});
		var commandToExecute = util.format('start %s ; status %s 2>&1', command.serviceName, command.serviceName);
		this.executeShellCommand(commandToExecute,command.app, function(status){
				console.log(status);
				this._eventEmitter.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))
	};	

	obj.stop =  function (command) {
		console.log("Stop task : " + command.actionName);
		this._eventEmitter.emit("statusChanged", {'name':	command.unitName, 'status': 'Stopping'});
		var commandToExecute = util.format('stop %s ; status %s 2>&1', command.serviceName, command.serviceName);
		this.executeShellCommand(commandToExecute,command.app, function(status){
				console.log(status);
				this._eventEmitter.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))
	};	
	
  obj.status =  function (command, callback) {
		console.log("Status task : " + command.actionName);
		var commandToExecute = util.format('status %s  2>&1 ', command.serviceName);
		this.executeShellCommand(commandToExecute,command.app, callback);
	};

	obj.restart =  function (command) {
	console.log("Restart task : " + command.actionName);
	this._eventEmitter.emit("statusChanged", {'name':	command.unitName, 'status': 'Stopping'});
	var commandToExecute = util.format('restart %s ; status %s ', command.serviceName, command.serviceName);
	this.executeShellCommand(commandToExecute,command.app, function(status){
			console.log(status);
			this._eventEmitter.emit("statusChanged", {'name':	command.unitName, 'status': status});
		}.bind(this))
	};	
	
	return obj;
}




