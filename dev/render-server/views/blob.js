module.exports = (function Blob(x, y, color, weather, yScale) {
  var _initX = x;
  var _initY = y;
  var _yScale = yScale ? yScale : 1;

  var _x = x;
  var _y = y;

  var radius = 0.02;

  var _color = color;
  var _weather = weather;

  var _leakSpeed = 0.00012;
  var _maxTrailLength = 0.3;

  var atTime = +new Date();

  function scaledCoords(x, y, scale) {
    return {
      x: x * scale,
      y: y * scale,
    };
  }

  function lengthSquared() {
    return Math.pow(_initX - _x, 2) + Math.pow(_initY - _y, 2);
  }

  function relativeAge() {
    return +new Date() - atTime;
  }

  // Use for sending to server. Returns init pos.
  var blobData = function () {
    return { x: _initX, y: _initY, color: _color };
  };

  // dirX is between 0 and π, on the half-circle
  // accelY is the acceleration downwards
  var update = function() {
    var deltaX = 0;
    var deltaY = _leakSpeed;

    var newX = _x + deltaX;// + Math.cos(dirX) * windSpeed;
    var newY = _y + deltaY;

    _x = newX;
    _y = newY;

    if (lengthSquared() > Math.pow(_maxTrailLength, 2)) {
      _initX = _initX + deltaX;
      _initY = _initY + deltaY;
    }
  };
  
  var render = function(ctx, cw, ch) {
    ctx.save();
    ctx.fillStyle = _color;
    ctx.beginPath();
    
    ctx.moveTo(_initX * cw, _initY * ch * _yScale);
    ctx.lineTo(_x * cw, _y * ch * _yScale);
    ctx.strokeStyle = _color;
    ctx.lineWidth = radius * 2 * cw;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(_initX * cw, _initY * ch * _yScale, radius * cw, 0, 2 * Math.PI);
    ctx.arc(_x * cw, _y * ch * _yScale, radius * cw, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  return { 
    render: render,
    update: update,
    color: function() { return _color; },
    blobData: blobData,
    atTime: atTime,
    relativeAge: relativeAge
  };
});