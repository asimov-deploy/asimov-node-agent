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
app.agentname = config.agentname;

function checkAPIkey (req, res, next) {
  
   if (req.method === 'POST') { 
     if(req.headers.authorization !== app.config.apikey)
     {
			console.log("Not correct key!");
			//console.log("apikey from nodefront: "  + req.headers.authorization);
			//console.log("my agent apikey: " + app.config.apikey);
			res.send(401);
     }
   }
   next()
}

app.use(checkAPIkey.bind(this));

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
app.eventSender = new objSender(config.nodefronturl, config.webcontrolurl, config.agentname, config.agentgroup, config.apikey);

setInterval(function() {
	app.eventSender.sendHeartBeat();
}, 500);


setInterval(function() {
	app.eventSender.sendHeartBeat();
	app.eventSender.sendlog();
}, 10000);

app.on("error", function(err) {
		console.log('ERROR:', err);
});

process.on('uncaughtException', function (err) {
	console.log('Caught process exception: ' + err);
});


console.log('Node agent running on: ' + app.config.port)

app.listen(app.config.port);