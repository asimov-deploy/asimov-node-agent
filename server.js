var app = require('restify').createServer();
var restify = require('restify');
var _ = require('underscore');
var AsimovConfig = require('./app/config').Config;
var tasks = require('./app/tasks')
var deployUnits = require('./app/deployunits');

var config = new AsimovConfig();
app.config = config;
app.tasks = tasks;
app.deployUnits = deployUnits;
app.agentname = config.getAgent().name;

app.use(restify.acceptParser(app.acceptable));
app.use(restify.queryParser());
app.use(restify.bodyParser());

require('./app/units.js')(app, config);
require('./app/versions.js')(app);
require('./app/actions.js')(app);


app.get('/', function(req, res, err) {
	res.send({ status: "ok"});
});

var objSender = require('./app/eventSender.js');
app.eventSender = new objSender(app,config);

setInterval(function() {
	app.eventSender.sendHeartBeat();
	//app.eventSender.sendlog();
}, 3000);


var port = 4333
console.log('Node agent running on: ' + port)
app.listen(port);