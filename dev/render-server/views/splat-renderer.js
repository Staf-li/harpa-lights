module.exports = (function SplatRenderer() {
  // Five minutes
  var MAX_SPLAT_AGE = 2*60*1000;
  var MAX_SPLATS = 1000;

  var _splats = [];
  var _currentTime = +new Date();

  var OPTIMAL_FRAMERATE = 1000/60;

  function addSplat(splat) {
    return _splats.push(splat);
  }

  function shouldCleanup(splat) {
    return splat.shouldKill() || splat.relativeAge() >= MAX_SPLAT_AGE || _splats.length > MAX_SPLATS;
  }

  function cleanUp() {
    for(var i in _splats) {
      if(shouldCleanup(_splats[i])) {
        _splats.splice(i--, 1);
      }
    }
  }

  function update() {
    // Tick the clock and cleanup old splats 
    var timeNow = +new Date();

    var deltaTime = timeNow - _currentTime;
    _currentTime = timeNow;

    var dt = deltaTime / OPTIMAL_FRAMERATE;

    cleanUp();

      if(dt > 100) {
          dt = 1;
      }

    for(var i in _splats) {
      _splats[i].update(dt);
    }
  }

  function render(ctx, cw, ch) {
    for(var i in _splats) {
      _splats[i].render(ctx, cw, ch);
    }
  }

  setInterval(function() {
    if (_splats.length > 0)
      console.log("Total active splats: ", _splats.length);
  }, 60 * 1000);

  return {
    addSplat: addSplat,
    shouldCleanup: shouldCleanup,
    cleanUp: cleanUp,
    update: update,
    render: render
  }
});