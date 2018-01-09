module.exports = (function VisualRenderer() {
  var _currentTime = +new Date();

  var OPTIMAL_FRAMERATE = 1000/60;

  var _heartData = [0, 0, 0];

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
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = "rgb(255, 255, 0)";
    ctx.fillRect((1/cw * (heartData[0]/1024)) % cw, 0, cw/17, ch);

    ctx.fillStyle = "rgb(0, 255, 255)";
    ctx.fillRect(0, (1/cw * (heartData[1]/1024)) % ch, cw, ch/8);
  }

  return {
    heartData: heartData,
    update: update,
    render: render
  }
});