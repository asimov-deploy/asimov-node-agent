var restify = require('restify');
module.exports = function(app) {
	app.post('/action/{name}', function(req, res, err) {
		res.send({ status: 'ok' })
	})

	app.post('/action', function(req, res) {

		if (req.params.actionName === undefined) {
			console.log("No action specified!")
    }

		try
		{
			var unitType = app.config.getUnitType(req.params.unitName).toLowerCase();
			var deployunit = new app.deployUnits[unitType](app,req.params.unitName);	
			deployunit.executeAction(req.params);

			app.eventSender.sendagentlog({
			eventName: req.body.actionName,
			unitName: req.params.unitName,
			agentName: app.agentname,
			level: "info",
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