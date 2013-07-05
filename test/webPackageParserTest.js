var assert = require('assert');
var fs = require('fs')

describe('web package parser', function(){
	it.only('should find 2 links', function() {
		var mockHtml = fs.readFileSync('test/mock-web-source-with-packages.html', 'utf-8');
		var packageCount = require('../app/webPackageParser.js')(mockHtml);

		assert.equal(2, packageCount.length);
	});

	it('should find 0 links', function() {
		var mockHtml = fs.readFileSync('test/mock-web-source-without-packages.html', 'utf-8');
		var packageCount = require('../app/webPackageParser.js')(mockHtml);

		assert.equal(0, packageCount.length);
	});

	it('should find 1 links', function() {
		var mockHtml = fs.readFileSync('test/mock-web-source-with-invalid-packages.html', 'utf-8');
		var packageCount = require('../app/webPackageParser.js')(mockHtml);

		assert.equal(1, packageCount.length);
	});
});