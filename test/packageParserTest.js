var assert = require('assert')

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
	})

});