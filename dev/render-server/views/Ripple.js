module.exports = (function Ripple(color) {
    var _scale = 0;
    var _killThisRipple = false;
    var _maxScale = 80;
    var _color = color;
    var _scalingSpeed = 0.02;

    var _xInit = 0;
    var _yInit = 0;

    var _width = 8;
    var _height = 6;


    function scale(point, offset) {
        return point;
    };

    var render = function(ctx, cw, ch) {
        _scale += _scalingSpeed;

        ctx.save();

        var xTranslate = (cw - _width * _scale) / 2;
        var ytTranslate = (ch - _height * _scale) / 2;

        ctx.translate(xTranslate, ytTranslate);

        ctx.strokeStyle = _color;
        ctx.lineWidth = 1;

        ctx.beginPath();
        
		ctx.moveTo(_scale*(_xInit+1), _scale*_yInit);
		ctx.lineTo(_scale*_xInit, _scale*(_yInit+_height));
		
		ctx.lineTo(_scale*(_xInit), _scale*(_yInit+_height-1));

		ctx.lineTo(_scale*(_xInit+_width), _scale*(_yInit+_height));

		ctx.lineTo(_scale*(_xInit+_width-3), _scale*(_yInit));

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
