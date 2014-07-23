var util = require("util");
var deployunit = require("./deployunit");
var WindowspPuppetUnit = function(server, name) {
    WindowspPuppetUnit.super_.call(this,server, name); // call deployunit's constructor
    console.log('WindowspPuppetUnit.constructor');
};

//Add properties that should overide deployunit after this row
util.inherits(WindowspPuppetUnit, deployunit);

WindowspPuppetUnit.prototype.executeAction = function(name) {
	console.log('WindowspPuppetUnit. executeAction'); 
  var action =  this._server.tasks.getTask(name.toLowerCase());
  action.execute(name);
}

 WindowspPuppetUnit.prototype.getUnitType =  function() {
  console.log("WindowspPuppetUnit: getUnitType");
  return "hallonkola";
};


module.exports =  WindowspPuppetUnit;