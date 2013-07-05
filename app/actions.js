module.exports = function(server) {
	server.post('/action/{name}', function(req, res, err) {
		res.send({ status: 'ok' })
	})
}