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

  function flattenDeployUnits()
  {
  	var deployUnits= [];
  	
		config.units.forEach(function(unit) {
    	console.log(unit.name);
    	deployUnits.push({name: unit.name, actions: config.getUnitActions(unit.name)});
		});
		return deployUnits;
  };

	server.get('/units/list', function(req, res) {
		res.json(flattenDeployUnits());
	});

}