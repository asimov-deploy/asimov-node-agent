module.exports = function(server, config) {
	var deployUnits = [ {
		name: 'Website',
		version: '1.0.0',
		branch: 'product',
		info: 'Hello from node agent',
		actions: [ 'Start', 'Stop', 'Verify' ]
	}, {
		name: 'Workers',
		version: '1.0.0',
		branch: 'master',
		info: 'I work in batches!',
		actions: [ 'Start', 'Stop', 'Verify' ]
	},
	{
		name: 'Puppet',
		version: '1.0.0',
		branch: 'master',
		info: 'I work in batches!',
		actions: [ 'Start', 'Stop', 'Puppet apply' ]
	}
]

	server.get('/units/list', function(req, res) {
		var deployUnits= [];
		try
		{
			config.units.forEach(function(unit) {
			var currentUnit = server.deployUnits.getUnitByName(unit.type);
			currentUnit = new currentUnit(server,unit.name);
			var deployunitInfo =  currentUnit.getDeployUnitInfo();	
			deployUnits.push(deployunitInfo);
			});
		}
		catch (err)
		{
			console.log(err);
		}
		res.json(deployUnits);
	});

	server.get('/units/deploy-parameters/:unitName', function(req, res) {
		var params = server.config.getDeployParameters(req.params.unitName);
		res.json(params);
	});


}