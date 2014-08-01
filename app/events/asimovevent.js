var os = require('os');

function AsimovEvent(eventname) {
  // always initialize all instance properties
  this.eventName = eventname;
  this.agentName = os.hostname();
}

module.exports = AsimovEvent;