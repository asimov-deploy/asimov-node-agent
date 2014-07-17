var restify = require('restify')
var es = require('../app/eventSender')
var tasks = require('../app/tasks/tasks')

module.exports = function(server) {
	server.post('/action/{name}', function(req, res, err) {
		console.log(req.params.name);

		res.send({ status: 'ok' })
	})

	server.post('/action', function(req, res) {
		// Make sure name is defined
	if (req.params.actionName === undefined) {
  }

  console.log(req.params.actionName);

	var action = tasks.getTask(req.body.actionName);
   
		var command  = req.body;
    action.execute(command);
		
		es.sendagentlog({
			eventName: req.body.actionName,
			unitName: "test",
			agentName: "NODE-AGENT",
			version: "100.0.0.1",
			branch: "uber",
			message: "Agent performed action: " + req.body.actionName 
		})

		res.send({ status: 'ok' })

	});
}