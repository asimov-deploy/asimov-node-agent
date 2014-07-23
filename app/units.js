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

var actionparamter = [{
            type: 'text',
            name: 'Name',
            default: 'YoYoYo'
         }];


	server.get('/units/list', function(req, res) {
		var deployUnits= [];
		try
		{
			config.units.forEach(function(unit) {
			console.log(unit.name);
			deployUnits.push({name: unit.name, hasDeployParameters:true, actions: config.getUnitActions(unit.name), status: "Running"});
			});
		}
		catch (err)
		{
			console.log(err);
		}
		res.json(deployUnits);
	});

	server.get('/units/deploy-parameters/:unitName', function(req, res) {
		res.json(actionparamter);
	});


}