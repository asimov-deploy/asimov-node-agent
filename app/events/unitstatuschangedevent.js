var asimovevent  = require("./asimovevent");
var util = require('util');

function UnitStatusChangedEvent(unitName, status) {
	UnitStatusChangedEvent.super_.call(this,unitName); // call asimovEvent's constructor
  this.eventName = "unitStatusChanged";
  this.unitName = unitName;

  this.status = status;
}
//Add properties that should overide deployunit after this row
util.inherits(UnitStatusChangedEvent, asimovevent);

module.exports = UnitStatusChangedEvent;