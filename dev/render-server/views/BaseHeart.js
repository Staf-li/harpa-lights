var Ripple = require('./Ripple.js');

module.exports = function BaseHeart(color, rippleScalingSpeed) {
  var _color = color;
  var _scale = 1;
  var _maxScale = 1.2;
  var _minScale =  Math.random() * (0.8 - 0.5) + 0.5;
  var _minScaleSpeed = 0.001;
  var _maxScaleSpeed = 0.005;

  var _maxRipppleCount = 200;
  
  var _isExpanding = false;

  var _scalingSpeed = Math.random() * (_maxScaleSpeed - _minScaleSpeed) + _minScaleSpeed;

  var _ripples = [];

  function addRipple(ripple) {
    _ripples.push(ripple);
  }

  var emit = function() {
    _scale = _maxScale;
    date = new Date();
    console.log('emit: ', date, ' from ', color);
    addRipple(new Ripple(_color, date.getTime(), rippleScalingSpeed));
  };

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

    if (_ripples.length > _maxRipppleCount) {
      while(_maxRipppleCount < _ripples.length) {
        _ripples.splice(0, 1);
      }
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

    ctx.lineTo(_scale * 1, _scale * 1);

    ctx.lineTo(_scale * 1, _scale * 1);

    ctx.lineTo(_scale * 1, _scale * 2);

    ctx.lineTo(_scale * 2, _scale * 3);
    
    ctx.lineTo(_scale * 3, _scale * 4);

    ctx.lineTo(_scale * 5, _scale * 5); //midja

    ctx.lineTo(_scale * 7, _scale * 4);

    ctx.lineTo(_scale * 8, _scale * 3);

    ctx.lineTo(_scale * 9, _scale * 2);

    ctx.lineTo(_scale * 9, _scale * 1);

    ctx.lineTo(_scale * 8, _scale * 0);

    ctx.lineTo(_scale * 7, _scale * 0);

    ctx.lineTo(_scale * 6, _scale * 0.5);

    ctx.lineTo(_scale * 5, _scale * 1); //midja

    ctx.lineTo(_scale * 4, _scale * 0.5);

    ctx.lineTo(_scale * 3, _scale * 0);

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
