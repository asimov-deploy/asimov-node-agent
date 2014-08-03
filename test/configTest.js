var assert = require('assert')
var configOverrides = {};
configOverrides.appPath = __dirname;
var AsimovConfig ;
var config;

describe('Config', function() {
  before(function(){
    AsimovConfig = require('../app/config').Config;
		config = new AsimovConfig(configOverrides);
  });

	describe('Loading', function() {
		it('Can load config', function(){
			
			assert.equal("demo",config.agentgroup.toLowerCase());
			assert.equal("Deploy Agent",config.name);
		})
	});

	describe('Environment', function() {
			it('Can retrieve ip', function(){
				assert(config.ip.length > 0 ,"Ip is not retrieved");
			});

			it('Can get current agent', function() {
				//console.log(config);
				var agent = config.getAgent();
				assert.equal("demo-01",agent.name);
			});

			it('Can get notification info', function(){
				assert.equal("http://localhost:3333",config.nodefronturl);
				assert.equal("http://localhost:4333",config.webcontrolurl);
				assert.equal("demo-01",config.agentname);
				assert.equal("Demo",config.agentgroup);
				assert.equal("adssaer32t24f23423",config.apikey);
			});
	});
});