var util = require('util');
var _ = require('underscore');

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
	var paramsAction = params.actionName.toLowerCase();
	var action = function(){};

	if(_.contains(_.keys(this._actions) , paramsAction) )
	{
		action =  this._actions[paramsAction];
		action(this, params);
	}
	else{
		var customactions = this._config.getUnitActions(this._name);
		if( _.contains( customactions , this._config.capitalizeString(paramsAction)))
		{
			var customaction = this._unitinfo.actions[paramsAction];
			if(_.contains(_.keys(this._actions) , customaction.type.toLowerCase()))
			{
				action =  this._actions[customaction.type.toLowerCase()];
				customaction.actionName = paramsAction;
				action(this,customaction);
			}
		}
	}
};

WindowsServiceUnit.prototype.getDeployUnitInfo = function() {
	var deployUnitInfo =  WindowsServiceUnit.super_.prototype.getDeployUnitInfo.call(this); 
  if (deployUnitInfo.actions.length === 0){
		deployUnitInfo.actions = defaultActions;
  } 
  else{
		deployUnitInfo.actions = _.union(defaultActions, deployUnitInfo.actions );
  }
		return deployUnitInfo;
 }

 WindowsServiceUnit.prototype._loadTasks =  function(name) {
		this._actions = {};
		this._actions.start =  defaulttasks.start;
		this._actions.stop = defaulttasks.stop;
		this._actions.deploy = function(deployunit, params){ console.log("Deploy : "  + params.actionName)}  ;
		this._actions.command = defaulttasks.command;
 }

module.exports =  WindowsServiceUnit;