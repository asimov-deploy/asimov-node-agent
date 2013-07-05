var restify = require('restify')
var packageParser = require('./webPackageParser.js')

var fakePackages = [{
		id: "in8ifn",
		timestamp: "2012-11-10 10:00:00",
		version: "1.3.0.0",
		branch: "master",
		commit: "2343123"
	}, {
		id: "64hfig",
		timestamp: "2012-11-10 10:00:00",
		version: "1.2.0.0",
		branch: "master",
		commit: "2343123"
	}
];

var url = 'http://localhost:8000/'
var client = restify.createStringClient({
	url: url
})

var es = require('../app/eventSender')
module.exports = function(server) {
	server.get('/versions/:unitName', function(req, res) {
		console.log('HAAAAJJJ')


		client.get('/workers/', function(err, request, response, data) {
			console.log(data)
			var packages = packageParser(data)
			console.log(packages)
			res.json(packages)
		})
	});

	server.post('/deploy/deploy', function(req, res) {
		res.json("ok");

		console.log("%j", req.body);

		es.sendEvent({
			eventName: "deployStarted",
			unitName: "Progressive.NET",
			version: "100.0.0.1",
			branch: "uber"
		})
	})
}