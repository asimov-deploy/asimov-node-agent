var asimovevent  = require("./asimovevent");
var util = require('util');

function DeployFailedEvent(unitName,version, status) {
	DeployFailedEvent.super_.call(this,unitName); // call asimovEvent's constructor
  this.eventName = "deployFailed";
  this.unitName = unitName;
  this.version = version;
	this.branch = "";
	this.status = status;
	this.userId = "";
	this.userName = "";
  this.status = status;
}
//Add properties that should overide deployunit after this row
util.inherits(DeployFailedEvent, asimovevent);

module.exports = DeployFailedEvent;

