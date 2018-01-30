var Ripple = require('./Ripple.js');

module.exports = function BaseHeart(color) {
  var _color = color;
  var _scale = 1;
  var _maxScale = 1.2;
  var _minScale =  Math.random() * (0.5 - 0.1) + 0.1;
  var _minScaleSpeed = 0.001;
  var _maxScaleSpeed = 0.005;
  
  var _isExpanding = false;

  var _scalingSpeed = Math.random() * (_maxScaleSpeed - _minScaleSpeed) + _minScaleSpeed;

  var _ripples = [];

  function addRipple(ripple) {
    console.log('Add ripple');
    _ripples.push(ripple);
  }

  var emit = function() {
    _isExpanding = true;
    addRipple(new Ripple(_color, new Date().getTime()));
  };

  // setInterval(emit, Math.random() * (10000 - 500) + 500);

  function updateScale(scale){
    if(_isExpanding) {
      if(scale > _maxScale){
        _isExpanding = false;
      }
      return scale + _scalingSpeed;
    }
    if (scale < _minScale) {
      _isExpanding = true;
    }
    return scale - _scalingSpeed;
  };

  var update = function(currHeartNumber) {
    cleanUp();
    
    _scale = updateScale(_scale);
    for (var i in _ripples) {
      _ripples[i].update();
    }
  };

  function cleanUp() {
    for (var i in _ripples) {
      if (_ripples[i].shouldKill()) {
        _ripples.splice(i--, 1);
      }
    }
  }

  var _width = 8;
  var _height = 6;

  var render = function(ctx, cw, ch) {
    ctx.save();

    for (i in _ripples) {
      _ripples[i].render(ctx, cw, ch);
    }

    _xTranslate = ((cw - _width * _scale) / 2)-10;
    _yTranslate = (ch - _height * _scale) / 2;

    ctx.translate(_xTranslate, _yTranslate);

    ctx.fillStyle = _color;
    ctx.beginPath();

    ctx.moveTo(_scale * 2, 0);

    ctx.lineTo(0, _scale * 2);

    ctx.lineTo(0, _scale * 3);

    ctx.lineTo(_scale * 3, _scale * 6);

    ctx.lineTo(_scale * 6, _scale * 6);

    ctx.lineTo(_scale * 8, _scale * 4);

    ctx.lineTo(_scale * 7, _scale * 2);

    ctx.lineTo(_scale * 4, 0);

    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  return {
    render: render,
    update: update,
    emit: emit
  };
};
