var DeployUnitInfoDTO = function(){
	this.name=  "";
	this.url= "";
	this.version = "";
	this.branch = "";
	this.status =  "NA";
	this.lastDeployed = "";
	this.hasDeployParameters = false;
	this.agent = {};
	this.agent.loadBalancerState = {};
	this.agent.loadBalancerState.enabled = false;
	this.actions = [];
};
module.exports = DeployUnitInfoDTO;


