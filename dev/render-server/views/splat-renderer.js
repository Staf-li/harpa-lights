module.exports = (function SplatRenderer() {
	// Five minutes
	var MAX_SPLAT_AGE = 5*60*1000;
	var MAX_SPLATS = 1000;

	var _splats = [];
	var _currentTime = +new Date();
	var _weatherData = {};

	function addSplat(splat) {
		return _splats.push(splat);
	}

	function shouldCleanup(splat) {
		return splat.relativeAge() >= MAX_SPLAT_AGE || _splats.length > MAX_SPLATS;
	}

	function cleanUp() {
		for(var i in _splats) {
			if(shouldCleanup(_splats[i])) {
				_splats.splice(i--, 1);
			}
		}
	}

	function update() {
		// Tick the clock and cleanup old splats
		_currentTime = +new Date();
		cleanUp();

		for(var i in _splats) {
			_splats[i].update();
		}
	}

	function render(ctx, cw, ch, yScale) {
		for(var i in _splats) {
			_splats[i].render(ctx, cw, ch);
		}
	}

	setInterval(function() {
		if (_splats.length > 0) console.log("Total active splats: ", _splats.length);
	}, 60 * 1000);

	console.log("Started splat renderer at time", _currentTime);

	return {
		addSplat: addSplat,
		shouldCleanup: shouldCleanup,
		cleanUp: cleanUp,
		update: update,
		render: render
	}
});