var restify = require('restify');
var _config;
var _nodeFront;

   function EnventSender(server, config) {
			this._config = config;
			this._nodeFront = restify.createJsonClient({ url: config.nodefronturl});
   }

   EnventSender.prototype.sendHeartBeat =  function() {
		
		var heartbeatData = {
			url: this._config.webcontrolurl,
			apiKey: this._config.apikey,
			version: '1.0.0',
			name: this._config.getAgent().name,
			group: this._config.agentgroup,
			configVersion: '0.0.1',
			loadbalancerid: 5
		};

		this._nodeFront.post('/agent/heartbeat', heartbeatData, function() {});
	};

	EnventSender.prototype.sendlog = function() {
		var logs = [{
			agentName: this._config.getAgent().name,
			timestamp: Date.now(),
			time: new Date(),
			level: "info",
			message: "Ping"
		}];

		this._nodeFront.post('/agent/log', logs, function() {});
	};

	EnventSender.prototype.sendagentlog = function(data) {
		var logs = [{
			agentName: this._config.getAgent().name,
			timestamp: Date.now(),
			time: new Date(),
			level: data.level,
			message: data.message
		}];
		console.log(logs);
		
		this._nodeFront.post('/agent/log', logs, function() {});
	};

	EnventSender.prototype.sendEvent = function(data) {
		data.agentName = this._config.getAgent().name,

		this._nodeFront.post('/agent/event', data, function() {});
	};

module.exports =  EnventSender;
