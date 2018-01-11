module.exports = (function Wripple(color) {
    var _scale = 1;
    var _killThisWripple = false;
    var _maxScale = 80;
    var _color = color;
    var _scalingSpeed = 0.08;
     
    var render = function(ctx, cw, ch) {
        _scale += _scalingSpeed;

        ctx.save();
        ctx.strokeStyle = _color;
        ctx.beginPath();
        ctx.bezierCurveTo(7.5, 3.7, 7.0, 2.5, 5.0, 2.5);
        ctx.bezierCurveTo(2.0, 2.5, 2.0, 6.25, 2.0, 6.25);
        ctx.bezierCurveTo(2.0, 8.0, 4.0, 10.2, 7.5, 12.0);
        ctx.bezierCurveTo(11.0, 10.2, 13.0, 8.0, 13.0, 6.25);
        ctx.bezierCurveTo(13.0, 6.25, 13.0, 2.5, 10.0, 2.5);
        ctx.bezierCurveTo(8.5, 2.5, 7.5, 3.7, 7.5, 4.0);
        ctx.scale(_scale,_scale);
        ctx.stroke();
        ctx.restore();
        
        ctx.save();
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.beginPath();
        ctx.bezierCurveTo(7.5, 3.7, 7.0, 2.5, 5.0, 2.5);
        ctx.bezierCurveTo(2.0, 2.5, 2.0, 6.25, 2.0, 6.25);
        ctx.bezierCurveTo(2.0, 8.0, 4.0, 10.2, 7.5, 12.0);
        ctx.bezierCurveTo(11.0, 10.2, 13.0, 8.0, 13.0, 6.25);
        ctx.bezierCurveTo(13.0, 6.25, 13.0, 2.5, 10.0, 2.5);
        ctx.bezierCurveTo(8.5, 2.5, 7.5, 3.7, 7.5, 4.0);
        ctx.scale(_scale*0.9,_scale*0.9);
        ctx.stroke();
        ctx.restore();
    };

    var update = function() {
        if(_scale > _maxScale) {
            _killThisWripple = true;
        }
    };

    return {
        render: render,
        update: update,
        shouldKill: function() { return _killThisWripple; }
    }
});
