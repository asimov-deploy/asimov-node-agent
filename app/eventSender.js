var restify = require('restify');
var _nodeFront;
var _agentName;
var _webcontrolurl;
var _agentGroup;
var _apiKey;
   function EnventSender(nodefronturl, webcontrolurl, agentName, agentGroup, apiKey) {
			this._agentName = agentName;
			this._webcontrolurl = webcontrolurl;
			this._agentGroup = agentGroup;
			this._apiKey = apiKey;
			this._nodeFront = restify.createJsonClient({ url: nodefronturl});
   }

   EnventSender.prototype.sendHeartBeat =  function() {
		
		var heartbeatData = {
			url: this._webcontrolurl,
			apiKey: this._apiKey,
			version: '1.0.0',
			name: this._agentName,
			group: this._agentGroup,
			configVersion: '0.0.1',
			loadbalancerid: 5
		};
		this._nodeFront.post('/agent/heartbeat', heartbeatData, function() {});
	};

	EnventSender.prototype.sendlog = function() {
		var logs = [{
			agentName: this._agentName,
			timestamp: Date.now(),
			time: new Date(),
			level: "info",
			message: "Ping"
		}];

		this._nodeFront.post('/agent/log', logs, function() {});
	};

	EnventSender.prototype.sendagentlog = function(data) {
		var logs = [{
			agentName: this._agentName,
			timestamp: Date.now(),
			time: new Date(),
			level: data.level,
			message: data.message
		}];
		console.log(logs);
		
		this._nodeFront.post('/agent/log', logs, function() {});
	};

	EnventSender.prototype.sendEvent = function(data) {
		data.agentName = this._agentName,

		this._nodeFront.post('/agent/event', data, function() {});
	};

module.exports =  EnventSender;
