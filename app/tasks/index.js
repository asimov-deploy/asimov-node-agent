var fs = require('fs');
/*
 * Modules are automatically loaded once they are declared
 * in the tasks directory.
 */
fs.readdirSync(__dirname).forEach(function(file) {
  if (file != 'index.js') {
    var moduleName = file.substr(0, file.indexOf('.'));
    exports[moduleName] = require('./' + moduleName);
  }

});

 exports.getTask = function(name) {
      return this[name + 'task'];
};
