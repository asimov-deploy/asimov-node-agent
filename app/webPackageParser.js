var packageParser = require('./packageParser');
var packageNamePattern = /<a.*?href\s*=\s*["\/']{1}.*["']{1}.*?>(.+?)<\/a>/gi;

module.exports = function(html) {
	var match = null
	var packages = []
	while( (match = packageNamePattern.exec(html)) ) {
		var p = packageParser(match[1]);
		if (p) {
			packages.push(p)
		}
	}

	return packages
}