var restify = require('restify')
var packageParser = require('./webPackageParser')
var es = require('../app/eventSender')

var url = 'http://localhost:8000/'
var client = restify.createStringClient({ url: url })

module.exports = function(server) {
	server.get('/versions/:unit', function(req, res) {
		client.get('/' + req.params.unit + '/', function(err, request, response, data) {
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
	});




}