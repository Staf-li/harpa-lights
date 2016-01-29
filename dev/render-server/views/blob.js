module.exports = (function Blob(x, y, color) {
  var _initX = x;
  var _initY = y;

  var _x = x;
  var _y = y;

  var _color = color;

  function scaledCoords(x, y, scale) {
    return {
      x: x * scale,
      y: y * scale,
    };
  }

  // Use for sending to server. Returns init pos.
  var blobData = function () {
    return { x: _initX, y: _initY, color: _color };
  };

  // dirX is between 0 and π, on the half-circle
  // accelY is the acceleration downwards
  var update = function() {
    var newX = _x;// + Math.cos(dirX) * windSpeed;
    var newY = _y + 0.00048;
    _x = newX;
    _y = newY;
  };
  
  var render = function(ctx, cw, ch) {
    ctx.save();
    ctx.fillStyle = _color;
    ctx.beginPath();
    ctx.arc(_x * cw, _y * ch, 0.05 * cw, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  return { 
    render: render,
    update: update,
    color: function() { return _color; },
    blobData: blobData
  };
});