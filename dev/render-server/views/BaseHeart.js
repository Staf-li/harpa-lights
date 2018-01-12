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

	function isRising(currHeartNumber) {
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
		console.log("Wripplecount: ", _wripples.length);

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


		/*
			cp1x	The x-coordinate of the first Bézier control point
			cp1y	The y-coordinate of the first Bézier control point
			cp2x	The x-coordinate of the second Bézier control point
			cp2y	The y-coordinate of the second Bézier control point
			x	The x-coordinate of the ending point
			y	The y-coordinate of the ending point
		*/

		ctx.fillStyle = _color;
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
