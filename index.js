var map = require('map-stream');

races = {};

function get(name) {
  if (races[name] == undefined) {
    races[name] = {
      'running': 0,
      'callbacks': []
    }
  }
  return races[name]
}

function taskFinished() {
  runningTasks -= 1;
  if (runningTasks == 0) {
    var cb = null;
    while (cb = finishedCbs.pop()) { cb(); }
  }
}

function join(opts) {
  opts = opts || {delay:100};
  race = get(opts.race)
  
  runningTasks += 1;  
  var stream = map(function(data, cb) { cb(null, data); })
      .on('end', function() {
        setTimeout(taskFinished, opts.delay); //delay to account for dependencies
      });
  return stream;
}

function wrap(cb, race) {
  race = get(race)
  
  return function() {
    args = arguments;
    finishedCbs.push(function() { cb.apply(null, args); });
  }
}

module.exports = {
  'wrap': wrap,
  'join': join
}
