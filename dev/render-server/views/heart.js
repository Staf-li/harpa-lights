module.exports = (function Heart(x, y) {

    var render = function(ctx, cw, ch, color, heartRate) {
        ctx.save();

        ctx.strokeStyle = color;
        ctx.transform(10*(heartRate/255)-2, 0, 0, 10*(heartRate/255)-2, 0, 0);
        ctx.beginPath();
        ctx.bezierCurveTo(7.5, 3.7, 7.0, 2.5, 5.0, 2.5);
        ctx.bezierCurveTo(2.0, 2.5, 2.0, 6.25, 2.0, 6.25);
        ctx.bezierCurveTo(2.0, 8.0, 4.0, 10.2, 7.5, 12.0);
        ctx.bezierCurveTo(11.0, 10.2, 13.0, 8.0, 13.0, 6.25);
        ctx.bezierCurveTo(13.0, 6.25, 13.0, 2.5, 10.0, 2.5);
        ctx.bezierCurveTo(8.5, 2.5, 7.5, 3.7, 7.5, 4.0);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    };

    return {
        render: render
    }
});
