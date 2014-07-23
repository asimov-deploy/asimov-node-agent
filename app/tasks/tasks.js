var stoptask = require("./stoptask");
var starttask = require("./starttask");
var applytask = require("./applytask");
var deploytask = require("./deploytask");
var factory = {};

factory.Start =  starttask;
factory.Stop = stoptask;
factory.Deploy = deploytask;
factory.Apply = applytask;

module.exports = {
	getTask: function(name) {
      return factory[name];
		}
};