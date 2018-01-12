module.exports = (function Wripple(color) {
    var _scale = 1;
    var _killThisWripple = false;
    var _maxScale = 80;
    var _color = color;
    var _scalingSpeed = 0.2;
     
    var render = function(ctx, cw, ch) {
        _scale += _scalingSpeed;

        ctx.save();
        
        ctx.strokeStyle = _color;
        ctx.lineWidth = "1";

        //ctx.scale(_scale,_scale);

        ctx.beginPath();

        ctx.arc(0, 0, 1*_scale/2, 0, 2*3.141592);
        
        ctx.closePath();

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
