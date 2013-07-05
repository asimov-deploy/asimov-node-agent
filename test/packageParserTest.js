var assert = require('assert')

//mykillerapp-v7.1.0-[master]-[14cbf27].prod.zip
// { "version": "7.1.0", "timestamp": "2013-06-28 16:26:11", "branch": "master", "commit": "14cbf27", "id": "mykillerapp-v7.1.0-[master]-[14cbf27].prod.zip" },

describe('Packageparser', function() {
	it('Can extract data from name', function(){
		var p = require('../app/packageParser.js')('PROD-v1.2.3.4-[master]-[7fb4og].prod.zip')

		assert.equal('1.2.3.4', p.version)
		assert.equal('master', p.branch)
		assert.equal('7fb4og', p.commit)
		assert.equal('PROD', p.name)
	})

	it('Returns null if name is invalid', function() {
		var p = require('../app/packageParser.js')('v1.2.3.4-[production][cdfeg].zip')

		assert.equal(null, p)
	});
});