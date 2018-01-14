var Ripple = require("./Ripple.js");

module.exports = (function BaseHeart(color) {
  var _color = color;
		
	var _hasEmittedInCycle = false;
	var _upperThreshHoldMet = false;
	var _lowerThreshHoldMet = false;
	
	var _oldHeartNumber = 0;

	var _ripples = [];
	var _upperThresholdHeartNumber = 100;
	var _lowerThresholdHeartNumber = 70;

    function addRipple(ripple) {
		_ripples.push(ripple);
    }

    var emit = function() {
		addRipple(new Ripple(_color));
    };

	function isRising(currHeartNumber) {
		return _oldHeartNumber < currHeartNumber;
	};

	function isFalling(currHeartNumber) {
		return _oldHeartNumber > currHeartNumber;
	};

  var update = function(currHeartNumber) {
		cleanUp();

		_upperThreshHoldMet = currHeartNumber > _upperThresholdHeartNumber;
		_lowerThreshHoldMet = currHeartNumber < _lowerThresholdHeartNumber;

		if (_hasEmittedInCycle && isFalling(currHeartNumber) && _lowerThreshHoldMet) {
			_hasEmittedInCycle = false;
		}

		for(var i in _ripples) {
			_ripples[i].update();
		}

		if (_upperThreshHoldMet && !_hasEmittedInCycle && isRising(currHeartNumber)) {
			addRipple(new Ripple(_color));
			_hasEmittedInCycle = true;
		}
		_oldHeartNumber = currHeartNumber;
  };

    function cleanUp() {
		for(var i in _ripples) {
			if(_ripples[i].shouldKill()) {
				_ripples.splice(i--, 1);
			}
		}
    };

		var _xInit = 0;
    var _yInit = 0;

    var _width = 8;
    var _height = 6;

    var render = function(ctx, cw, ch) {
		_xInit = (cw-_width)/2;
		_yInit = (ch-_height)/2;
		ctx.save();

		for(i in _ripples) {
			_ripples[i].render(ctx, cw, ch);
		};

		ctx.fillStyle = _color;
		ctx.beginPath();

		ctx.moveTo(_xInit+1, _yInit);
		ctx.lineTo(_xInit, _yInit+_height);
		
		ctx.lineTo(_xInit, _yInit+_height-1);

		ctx.lineTo(_xInit+_width, _yInit+_height);

		ctx.lineTo(_xInit+_width-3, _yInit);

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
