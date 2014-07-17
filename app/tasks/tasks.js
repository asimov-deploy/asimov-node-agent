var stoptask = require("./stoptask");
var starttask = require("./starttask");
var factory = {};

factory.start =  starttask;
factory.stop = stoptask;

module.exports = {
	getTask: function(name) {
      return factory[name];
		}
};