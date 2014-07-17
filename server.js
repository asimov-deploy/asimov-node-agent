var app = require('restify').createServer();
var restify = require('restify');

app.use(restify.acceptParser(app.acceptable));
app.use(restify.queryParser());
app.use(restify.bodyParser());

require('./app/units.js')(app);
require('./app/versions.js')(app);
require('./app/actions.js')(app);

app.get('/', function(req, res, err) {
	res.send({ status: "ok"});
});

var eventSender = require('./app/eventSender.js');
setInterval(function() {
	eventSender.sendHeartBeat();
	eventSender.sendlog();
}, 3000);


var port = 4333
console.log('Node agent running on: ' + port)
app.listen(port);