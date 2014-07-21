var restify = require('restify');
var client = restify.createJsonClient({ url: 'http://localhost:3333' });
var _config;

   function EnventSender(server, config) {
	   this._config = config;
   }

   EnventSender.prototype.sendHeartBeat =  function() {
		var heartbeatData = {
			url: 'http://localhost:4333',
			apiKey: 'hej',
			version: '1.0.0',
			name: this._config.getAgent().name,
			group: this._config.agentgroup,
			configVersion: '0.0.1',
			loadbalancerid: 5
		};

		client.post('/agent/heartbeat', heartbeatData, function() {});
	};

	EnventSender.prototype.sendlog = function() {
		var logs = [{
			agentName: this._config.getAgent().name,
			timestamp: "2012-05-10 10:00:00",
			time: new Date(),
			level: "info",
			message: "hello"
		}];

		client.post('/agent/log', logs, function() {});
	};

	EnventSender.prototype.sendagentlog = function(data) {
		var logs = [{
			agentName: data.agentName,
			timestamp: Date.now(),
			time: new Date(),
			level: "info",
			message: data.message
		}];

		client.post('/agent/log', logs, function() {});
	};

	EnventSender.prototype.sendEvent = function(data) {
		data.agentName = "NodeAgent";

		client.post('/agent/event', data, function() {});
	};

module.exports =  EnventSender;
