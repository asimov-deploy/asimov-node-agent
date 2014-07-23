var restify = require('restify');
module.exports = function(server) {
	server.post('/action/{name}', function(req, res, err) {
		res.send({ status: 'ok' })
	})

	server.post('/action', function(req, res) {

		if (req.params.actionName === undefined) {
			console.log("No action specified!")
    }

		try
		{
			var unitType = server.config.getUnitType(req.params.unitName).toLowerCase();
			var deployunit = new server.deployUnits[unitType](server,req.params.unitName);	
			deployunit.executeAction(req.params.actionName);

			server.eventSender.sendagentlog({
			eventName: req.body.actionName,
			unitName: req.params.unitName,
			agentName: server.agentname,
			version: "100.0.0.1",
			branch: "uber",
			message: "Agent performed action: " + req.body.actionName 
		});

		}
		catch(err) {
			console.log(err);
		}

		res.send({ status: 'ok' })

	});
}