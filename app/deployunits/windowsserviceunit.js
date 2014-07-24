var util = require("util");
var deployunit = require("./deployunit");
var defaultActions = ["Start", "Stop"];
var WindowsServiceUnit = function(server, name) {
    WindowsServiceUnit.super_.call(this,server, name); // call deployunit's constructor
    this._loadTasks();
    console.log('WindowsServiceUnit.constructor');
};

WindowsServiceUnit.prototype.executeAction = function(name) {
	WindowspPuppetUnit.super.executeAction.call(this, name); 
	console.log('WindowsServiceUnit. executeAction'); 
	var action =  this._actions[name.toLowerCase()];
	action.execute(name);
}



//Add properties that should overide deployunit after this row
util.inherits(WindowsServiceUnit, deployunit);

WindowsServiceUnit.prototype.getDeployUnitInfo = function() {
	console.log('WindowsServiceUnit. getDeployUnitInfo'); 
	//WindowsServiceUnit.super_.prototype.getDeployUnitInfo.apply(this);
  var deployUnitInfo =  WindowsServiceUnit.super_.prototype.getDeployUnitInfo.call(this); 
  if (deployUnitInfo.actions.length === 0){
  	deployUnitInfo.actions = defaultActions;
  } 
  else{
  	deployUnitInfo.actions.concat(defaultActions);	
  }
		return deployUnitInfo;
 }

 WindowsServiceUnit.prototype._loadTasks =  function(name) {
		this._actions = {};
		this._actions.Start =  this._server.tasks.windowsservicestarttask;
		this._actions.Stop = this._server.tasks.windowsservicestoptask;
		this._actions.Deploy = this._server.tasks.windowsservicedeploytask;
		this._actions.Apply = this._server.tasks.windowsserviceapplytask;
 }

 WindowsServiceUnit.prototype.getUnitType =  function() {
  console.log("WindowsServiceUnit: getUnitType");
  return "hallonkola";
};


module.exports =  WindowsServiceUnit;