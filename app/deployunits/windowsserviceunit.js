var util = require("util");
var deployunit = require("./deployunit");
var defaulttasks = require("../tasks/windowsservicetasks.js")
var defaultActions = ["Start", "Stop"];
var WindowsServiceUnit = function(server, name) {
    WindowsServiceUnit.super_.call(this,server, name); // call deployunit's constructor
    this._loadTasks();
};

//Add properties that should overide deployunit after this row
util.inherits(WindowsServiceUnit, deployunit);

WindowsServiceUnit.prototype.executeAction = function(params) {
	WindowsServiceUnit.super_.prototype.executeAction.call(this, params); 
	var action =  this._actions[params.actionName.toLowerCase()];
	action(this, params);
}

WindowsServiceUnit.prototype.getDeployUnitInfo = function() {
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
		this._actions.start =  defaulttasks.start;
		this._actions.stop = defaulttasks.stop;
		this._actions.deploy = function(deployunit, params){ console.log("Deploy : "  + params.actionName)}  ;
		this._actions.apply = defaulttasks.apply;
 }

 WindowsServiceUnit.prototype.getUnitType =  function() {
  console.log("WindowsServiceUnit: getUnitType");
  return "hallonkola";
};


module.exports =  WindowsServiceUnit;