var restify = require('restify')
var packageParser = require('./webPackageParser')
var es = require('../app/eventSender')

var url = 'http://localhost:8000/'
var client = restify.createStringClient({ url: url })

module.exports = function(server) {
	server.get('/versions/:unitName', function(req, res) {
		client.get('/workers/', function(err, request, response, data) {
			var packages = packageParser(data)
			console.log('packages', packages)
			res.json(packages)
		})
	});

	server.post('/deploy/deploy', function(req, res) {
		res.json("ok");

		es.sendEvent({
			eventName: "deployStarted",
			unitName: "Progressive.NET",
			version: "100.0.0.1",
			branch: "uber"
		})
	})
}