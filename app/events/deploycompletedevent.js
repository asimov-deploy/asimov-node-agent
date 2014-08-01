var asimovevent  = require("./asimovevent");
var util = require('util');

function DeployCompletedEvent(unitName,version, status) {
	DeployCompletedEvent.super_.call(this,unitName); // call asimovEvent's constructor
  this.eventName = "deployCompleted";
  this.unitName = unitName;
  this.version = version;
	this.branch = "";
	this.status = status;
	this.userId = "";
	this.userName = "";
  this.status = status;
}
//Add properties that should overide deployunit after this row
util.inherits(DeployCompletedEvent, asimovevent);

module.exports = DeployCompletedEvent;

