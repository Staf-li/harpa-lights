module.exports = (function VisualRenderer() {
  var _currentTime = +new Date();

  var OPTIMAL_FRAMERATE = 1000/60;

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

  function render(ctx, cw, ch) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = "rgb(255, 255, 0)";
    ctx.fillRect((1/cw * _currentTime) % cw, 0, cw/17, ch);

    ctx.fillStyle = "rgb(0, 255, 255)";
    ctx.fillRect(0, (1/cw * _currentTime) % ch, cw, ch/8);
  }

  return {
    update: update,
    render: render
  }
});