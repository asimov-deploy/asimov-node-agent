var asimovevent  = require("./asimovevent");
var util = require('util');

var  State = function()
{
	this.enabled = false;
	this.connectionCount = 0;
	this.serverId = "";
};

function LoadBalancerStateEvent(state) {
	LoadBalancerStateEvent.super_.call(this,unitName); // call asimovEvent's constructor
  this.eventName = "loadBalancerStateChanged";
  this.state = state;
}
//Add properties that should overide deployunit after this row
util.inherits(LoadBalancerStateEvent, asimovevent);

module.exports = LoadBalancerStateEvent;