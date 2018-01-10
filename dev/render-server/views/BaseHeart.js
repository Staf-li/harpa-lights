module.exports = (function BaseHeart(x, y) {

    var render = function(ctx, cw, ch, color) {
        ctx.save();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(10, 5);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    };

    return {
        render: render
    }
});
