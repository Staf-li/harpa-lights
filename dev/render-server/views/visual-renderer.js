var Heart = require("./heart.js");
var BaseHeart = require("./BaseHeart.js");

module.exports = (function VisualRenderer() {
  var _currentTime = +new Date();

  var OPTIMAL_FRAMERATE = 1000/60;

  var _heartData = [0, 0, 0];

  var _hearts = [new Heart(), new Heart()]

  var _baseHeart = new BaseHeart();
  function update() {
    // Tick the clock and cleanup old splats 
    var timeNow = +new Date();

    var deltaTime = timeNow - _currentTime;
    _currentTime = timeNow;

    var dt = deltaTime / OPTIMAL_FRAMERATE;

    if(dt > 100) {
        dt = 1;
    }
  }

  function heartData(data) {
    _heartData = data;
  }

  function render(ctx, cw, ch) {
    _baseHeart.render(ctx,cw,ch, "rgb(255, 0, 0)");
    for(i in _hearts) {
      _hearts[i].render(ctx, cw, ch, "rgb(0, 0, 255)", (_heartData[0]));
    }
  }

  return {
    heartData: heartData,
    update: update,
    render: render
  }
});
