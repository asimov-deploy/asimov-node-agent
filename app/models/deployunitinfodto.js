var DeployUnitInfoDTO = function(){
	this.name=  "";
	this.url= "";
	this.version = "";
	this.branch = "";
	this.status =  "NA";
	this.lastDeployed = "";
	this.hasDeployParameters = false;
	this.actions = [];
};
module.exports = DeployUnitInfoDTO;


