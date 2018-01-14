module.exports = (function Ripple(color) {
    var _scale = 0;
    var _killThisRipple = false;
    var _maxScale = 80;
    var _color = color;
    var _scalingSpeed = 0.002;

    var _xInit = 15;
    var _yInit = 5;

    var _width = 8;
    var _height = 6;

    /*
    var x = (ctx.canvas.width - image.width * scale) / 2;
    var y = (ctx.canvas.height - image.height * scale) / 2;
    ctx.drawImage(image, x, y, image.width * scale, image.height * scale); 
    */

    function scale(point, offset) {
        return point;
    };

    var render = function(ctx, cw, ch) {
        _scale += _scalingSpeed;

        _xScale = _scale;
        _yScale = _scale;

        ctx.save();
        ctx.translate((cw - _width * _scale) / 2, (ch - _height * _scale) / 2 );

        ctx.strokeStyle = _color;
        ctx.lineWidth = "1";

        ctx.beginPath();
        
        ctx.moveTo(-(_xInit+1)*_xScale, -_yInit*_yScale);
        ctx.lineTo(_xInit*-_xScale, (_yInit+_height-1)*_yScale);
        ctx.lineTo((_xInit+_width)*_xScale, (_yInit+_height)*_yScale);
        ctx.lineTo((_xInit+_width-3)*_xScale, -_yInit*_yScale);

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
