var assert = require('assert');

describe('gulp-race', function() {
  it('should load properly', function() {
    assert.doesNotThrow(function(){require('../index')});
  })
});
