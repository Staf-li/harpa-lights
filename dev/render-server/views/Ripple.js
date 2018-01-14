module.exports = (function Ripple(color) {
    var _scale = 1;
    var _killThisRipple = false;
    var _maxScale = 80;
    var _color = color;
    var _scalingSpeed = 0.02;

    var _xTranslate = 0;
    var _yTranslate = 0;
    var _width = 8;
    var _height = 6;

    function scale(point, offset) {
        return point;
    };

    var render = function(ctx, cw, ch) {
        _scale += _scalingSpeed;

        ctx.save();

        _xTranslate = (cw - _width * _scale) / 2;
        _yTranslate = (ch - _height * _scale) / 2;

        ctx.translate(_xTranslate, _yTranslate);

        ctx.strokeStyle = _color;
        ctx.lineWidth = 1;

        ctx.beginPath();
        
        ctx.moveTo(_scale*1, 0);
        
		ctx.lineTo(0, _scale*_height);
		
		ctx.lineTo(0, _scale*(_height-1));

		ctx.lineTo(_scale*_width, _scale*_height);

		ctx.lineTo(_scale*(_width-3), 0);

        ctx.closePath();
        
        ctx.stroke();

        ctx.restore();
    };

    var update = function() {
        if(_scale > _maxScale) {
            _killThisRipple = true;
        }
    };

    return {
        render: render,
        update: update,
        shouldKill: function() { return _killThisRipple; }
    }
});
