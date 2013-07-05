var app = require('restify').createServer();
var eventSender = require('./app/eventSender.js');

require('./app/units.js')(app);
require('./app/versions.js')(app);
require('./app/actions.js')(app);

app.get('/', function(req, res, err) {
	res.send({ status: "ok"});
});

setInterval(function() {
	eventSender.sendHeartBeat();
	eventSender.sendlog();
}, 3000);


var port = 4333
console.log('Node agent running on: ' + port)
app.listen(port);