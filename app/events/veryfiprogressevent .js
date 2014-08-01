var asimovevent  = require("./asimovevent");
var util = require('util');

function VerifyProgressEvent(unitName) {
	VerifyProgressEvent.super_.call(this,unitName); // call asimovEvent's constructor
	this.eventName = "verify-progress";
	this.unitName = unitName;
	this.completed = false;
	this.started = false;
	this.test ={};
	this.image ={};
	this.report ={};
}
//Add properties that should overide deployunit after this row
util.inherits(VerifyProgressEvent, asimovevent);

module.exports = VerifyProgressEvent;