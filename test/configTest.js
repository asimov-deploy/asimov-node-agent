var assert = require('assert')
var configOverrides = {};
configOverrides.appPath = __dirname;

describe('Config object', function() {
		var AsimovConfig = require('../app/config').Config;
		var config = new AsimovConfig(configOverrides);

	it('Can load config', function(){
		//console.log(config);

		assert.equal("demo",config.agentgroup.toLowerCase());
		assert.equal("Deploy Agent",config.name);
	})

	it('Can retrieve ip', function(){
		assert(config.ip.length > 0 ,"Ip is not retrieved");
	})

});