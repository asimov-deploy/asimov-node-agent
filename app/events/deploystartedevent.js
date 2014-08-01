var asimovevent  = require("./asimovevent");
var util = require('util');

function DeployStarted(unitName,version, status) {
	DeployStarted.super_.call(this,unitName); // call asimovEvent's constructor
  this.eventName = "deployStarted";
  this.unitName = unitName;
  this.version = version;
	this.branch = "";
	this.status = status;
	this.userId = "";
	this.userName = "";
  this.status = status;
}
//Add properties that should overide deployunit after this row
util.inherits(DeployStarted, asimovevent);

module.exports = DeployStarted;

