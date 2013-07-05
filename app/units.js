module.exports = function(server) {
	var deployUnits = [ {
		"name": "website",
		"version": "1.0.0",
		"branch": "product",
		"info": "Hello from node agent",
		actions: [ 'start', 'stop', 'verify' ]
	}, {
		name: 'worker',
		version: '1.0.0',
		branch: 'master',
		info: 'I work in batches!',
		actions: [ 'start', 'stop', 'verify' ]
	}
	];

	server.get('/units/list', function(req, res) {
		res.json(deployUnits);
	});
}