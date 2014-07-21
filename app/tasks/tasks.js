var stoptask = require("./stoptask");
var starttask = require("./starttask");
var factory = {};

factory.Start =  starttask;
factory.Stop = stoptask;

module.exports = {
	getTask: function(name) {
      return factory[name];
		}
};