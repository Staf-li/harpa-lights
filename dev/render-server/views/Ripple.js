module.exports = function Ripple(color, createdAt) {
  var _scale = 1;
  var _killThisRipple = false;
  var _maxScale = 80;
  var _color = color;
  var _scalingSpeed = 0.02;

  var _xTranslate = 0;
  var _yTranslate = 0;
  var _width = 8;
  var _height = 6;

  var createdAt = createdAt;

  function scale(point, offset) {
    return point;
  }

  var render = function(ctx, cw, ch) {
    _scale += _scalingSpeed;

    ctx.save();

    _xTranslate = (cw - _width * _scale) / 2;
    _yTranslate = (ch - _height * _scale) / 2;

    ctx.translate(_xTranslate, _yTranslate);

    ctx.strokeStyle = _color;
    ctx.lineWidth = 0.8;

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

    ctx.stroke();

    ctx.restore();
  };

  var update = function() {
    if (_scale > _maxScale) {
      _killThisRipple = true;
    }
  };

  return {
    render: render,
    update: update,
    createdAt: createdAt,
    shouldKill: function() {
      return _killThisRipple;
    },
  };
};
