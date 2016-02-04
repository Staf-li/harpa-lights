module.exports = (function Blob(x, y, color, weather, yScale) {
  var _originalX = x;
  var _originalY = y;
  var _initX = x;
  var _initY = y;
  var _yScale = yScale ? yScale : 1;

  var _x = x;
  var _y = y;

  var radius = 0.015;
  var fadeOutDelay = 40*1000;
  var fadeOutTime = 20*1000;

  var _color = color;
  var _weather = weather;

  var _leakSpeed = 0.00010;
  var _maxTrailLength = 0.3;

  var _rotation = 0;

  var _killMe = false;

  var _opacity = 1;

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

  var update = function(dt) {
    var deltaX = 0;
    var deltaY = _weather.isRaining ? dt * _leakSpeed * 1.5 : dt * _leakSpeed;

    var newX = _x + deltaX;
    var newY = _y + deltaY;

    _x = newX;
    _y = newY;

    if(relativeAge() > fadeOutDelay) {
      _opacity -= 0.001 * dt;
      if (_opacity < 0) {
        _killMe = true;
      }
    }

    if (lengthSquared() > Math.pow(_maxTrailLength, 2)) {
      _initX = _initX + deltaX;
      _initY = _initY + deltaY;
    }
  };

  function rgbaString(colorArray, alpha) {
    return 'rgba(' + colorArray[0] + ', ' + colorArray[1] + ', ' + colorArray[2] + ', ' + alpha + ')';
  }

  var render = function(ctx, cw, ch) {
    ctx.save();
    ctx.fillStyle = rgbaString(_color, _opacity);

    ctx.translate(_originalX * cw, _originalY * ch * _yScale);

    var windRotation = - _weather.windDirection * _weather.windSpeed / 30 * Math.PI / 2;
    if(windRotation > Math.PI/2) windRotation = Math.PI/2;

    if(windRotation < - Math.PI/2) windRotation = - Math.PI/2

    ctx.rotate(windRotation)
    ctx.translate(-_originalX * cw, -_originalY * ch * _yScale);
    
    ctx.beginPath();
    ctx.arc(_initX * cw, _initY * ch * _yScale, radius * cw, Math.PI, 2 * Math.PI);
    ctx.arc(_x * cw, _y * ch * _yScale, radius * cw, 0, Math.PI);

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
    relativeAge: relativeAge,
    shouldKill: function() { return _killMe; }
  };
});