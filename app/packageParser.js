var packagePattern = /v(\d+\.\d+\.\d+\.\d+)-\[(\w*)\]-\[(\w*)\]/g;

function isAnyParameterMissing(groups) {
	return !groups[0] || !groups[0][1] || !groups[0][2] || !groups[0][3];
}

module.exports = function(pname) {
	var match = null;
	var groups = [];
	while(match = packagePattern.exec(pname)) {
		groups.push(match);
	}

	if (isAnyParameterMissing(groups)) {
		return null;
	}

	groups = groups[0];

	return {
		name: groups[1],
		branch: groups[2],
		version: groups[3]
	};
};