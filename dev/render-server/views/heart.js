module.exports = (function Heart(color) {
    var _scale = 1;
    var _killThisHeart = false;
    var _maxScale = 20;
    var _color = color;
    var _heartHeight = 1;
    var _heartWidth = 1;
     
    var render = function(ctx, cw, ch) {
        _scale += 0.05;

        ctx.save();
        ctx.strokeStyle = _color;
        ctx.fillStyle = "rgb(0,0,0)";

        ctx.translate(-_heartWidth/2, _heartHeight/2);
        // ctx.transform(_scale, 0, 0, _scale, -_heartWidth/2, -_heartHeight/2);
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(10, 5);
        ctx.lineTo(5, 10);
        ctx.scale(_scale,_scale);
        ctx.lineWidth = 1;
        ctx.closePath();
        ctx.stroke();
        ctx.fill()

        ctx.restore();
    };

    var update = function() {
        if(_scale > _maxScale) {
            _killThisHeart = true;
        }
    };

    return {
        render: render,
        update: update,
        shouldKill: function() { return _killThisHeart; }
    }
});
