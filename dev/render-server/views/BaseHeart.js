var Wripple = require("./Wripple.js");

module.exports = (function BaseHeart(color) {
    var _color = color;
    var _shouldEmit = false;
		var _wripples = [];
		var _thresholdHeartNumber = 140;
		var _oldHeartNumber = 0;

    function addWripple(wripple) {
      _wripples.push(wripple);
    }

    var emit = function() {
      addWripple(new Wripple(_color));
    };

		function isRising(number) {
			return _oldHeartNumber < number;
		}; 

    var update = function(heartData) {
			cleanUp();

			// TODO: use smith trigger
			_shouldEmit = ((heartData > _thresholdHeartNumber) && isRising(heartData));

			for(var i in _wripples) {
				_wripples[i].update();
			}
			
			console.log("heartData: ", heartData);
			console.log("_thresholdHeartNumber: ", _thresholdHeartNumber);
			if (_shouldEmit) {
				console.log('Should add');
				addWripple(new Wripple(_color));
			}
    };

    function cleanUp() {
			for(var i in _wripples) {
				if(_wripples[i].shouldKill()) {
					_wripples.splice(i--, 1);
				}
			}
    };

    var render = function(ctx, cw, ch) {
			ctx.save();

			for(i in _wripples) {
				_wripples[i].render(ctx, cw, ch);
			};

			ctx.fillStyle = _color;
			ctx.beginPath();
			ctx.bezierCurveTo(7.5, 3.7, 7.0, 2.5, 5.0, 2.5);
			ctx.bezierCurveTo(2.0, 2.5, 2.0, 6.25, 2.0, 6.25);
			ctx.bezierCurveTo(2.0, 8.0, 4.0, 10.2, 7.5, 12.0);
			ctx.bezierCurveTo(11.0, 10.2, 13.0, 8.0, 13.0, 6.25);
			ctx.bezierCurveTo(13.0, 6.25, 13.0, 2.5, 10.0, 2.5);
			ctx.bezierCurveTo(8.5, 2.5, 7.5, 3.7, 7.5, 4.0);
			ctx.closePath();
			ctx.fill();

			ctx.restore();
    };

    return {
			render: render,
			update: update,
			shouldEmit: function() {
					return _shouldEmit;
			}
    };
});
