var Wripple = require("./Wripple.js");

module.exports = (function BaseHeart(color) {
    var _color = color;
		
		var _hasEmittedInCycle = false;
		var _threshHoldMet = false;
		var _oldHeartNumber = 0;
	
		var _wripples = [];
		var _thresholdHeartNumber = 180;

    function addWripple(wripple) {
      _wripples.push(wripple);
    }

    var emit = function() {
      addWripple(new Wripple(_color));
    };

		function isRising(currHeartNumbernumber) {
			return _oldHeartNumber < currHeartNumber;
		};

		function isFalling(currHeartNumber) {
			return _oldHeartNumber > currHeartNumber;
		};

		function isThresholdMet (currHeartNumber) {
			return currHeartNumber > _thresholdHeartNumber;
		};

    var update = function(currHeartNumber) {
			cleanUp();

			_threshHoldMet = isThresholdMet(currHeartNumber);
			
			if (isFalling(currHeartNumber) && !_threshHoldMet) {
				_hasEmittedInCycle = false;
			}

			for(var i in _wripples) {
				_wripples[i].update();
			}

			if (_threshHoldMet && !_hasEmittedInCycle) {
				addWripple(new Wripple(_color));
				_hasEmittedInCycle = true;
			}
			_oldHeartNumber = currHeartNumber;
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
