module.exports = (function Ripple(color) {
    var _scale = 1;
    var _killThisRipple = false;
    var _maxScale = 80;
    var _color = color;
    var _scalingSpeed = 0.2;
     
    var render = function(ctx, cw, ch) {
        _scale += _scalingSpeed;

        ctx.save();
        
        ctx.strokeStyle = _color;
        ctx.lineWidth = "1";

        // ctx.scale(_scale,_scale);

        ctx.beginPath();

		//corner
		ctx.bezierCurveTo(20, 10, 20, 10, 20, 10);
		ctx.bezierCurveTo(20, 10, 20, 10, 22, 6);
		//corner
		ctx.bezierCurveTo(20, 3, 20, 3, 20, 3);
		//corner
		ctx.bezierCurveTo(15, 3, 15, 3, 18, 3);
		ctx.bezierCurveTo(15, 3, 15, 3, 12, 6);
		//corner
		ctx.bezierCurveTo(15, 10, 15, 10, 18, 10);
        ctx.bezierCurveTo(15, 10, 15, 10, 19.5, 11);
                
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
