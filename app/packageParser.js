var packagePattern = /(\w*)-v(\d+\.\d+\.\d+\.\d+)-\[(\w*)\]-\[(\w*)\]/g

function isAnyParameterMissing(groups) {
	return !groups[0] || !groups[0][1] || !groups[0][2] || !groups[0][3] || !groups[0][4]
}

module.exports = function(pname) {
	var match = null
	var groups = []
	while( (match = packagePattern.exec(pname))) {
		groups.push(match)
	}

	if (isAnyParameterMissing(groups)) {
		return null
	}

	groups = groups[0]

	return {
		name: groups[1],
		version: groups[2],
		branch: groups[3],
		commit: groups[4],
		timestamp: '1984-03-03 06:54:12'
	}
}