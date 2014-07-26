var restify = require('restify')
var packageParser = require('./webPackageParser')

var url = 'http://localhost:8000/'
var client = restify.createStringClient({ url: url })


var versions = [ 
{
		name: 'Website',
		version: '1.0.0',
		branch: 'product',
		commit: 'Latest and greates release',
		timestamp: '2014-07-03 06:54:12'
	}, 
	{
		name: 'Workers',
		version: '1.0.0',
		branch: 'master',
		commit: 'I work in batches!',
		timestamp: '2014-03-03 06:54:12'
	},
	{
		name: 'Puppet',
		version: '1.0.0',
		branch: 'master',
		commit: 'New configuration',
		timestamp: '1984-03-03 06:54:12'
	}
];

module.exports = function(server) {
	server.get('/versions/:unit', function(req, res) {
		client.get('/' + req.params.unit + '/', function(err, request, response, data) {
			var packages = packageParser(data)
			res.json(versions)
		})
	});

	server.post('/deploy/deploy', function(req, res) {
		res.json("ok");

			var unitType = server.config.getUnitType(req.params.unitName).toLowerCase();
			var deployunit = new server.deployUnits[unitType](server,req.params.unitName);	
			req.params.actionName = "deploy";
			deployunit.executeAction(req.params);

		server.eventsender.sendEvent({
			eventName: "deployStarted",
			unitName: "Progressive.NET",
			version: "100.0.0.1",
			branch: "uber"
		})
	});




}