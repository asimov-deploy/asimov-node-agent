var util = require("util");
var deployunit = require("./deployunit");
var WindowsServiceUnit = function(server, name) {
    WindowsServiceUnit.super_.call(this,server, name); // call deployunit's constructor
    console.log('WindowsServiceUnit.constructor');
};

//Add properties that should overide deployunit after this row
util.inherits(WindowsServiceUnit, deployunit);

WindowsServiceUnit.prototype.executeAction = function(name) {
	console.log('WindowsServiceUnit. executeAction'); 
  var action =  this._server.tasks.getTask(name.toLowerCase());
  action.execute(name);
}

 WindowsServiceUnit.prototype.getUnitType =  function() {
  console.log("WindowsServiceUnit: getUnitType");
  return "hallonkola";
};


module.exports =  WindowsServiceUnit;