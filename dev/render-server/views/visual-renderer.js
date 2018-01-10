var Heart = require("./heart.js");
var BaseHeart = require("./BaseHeart.js");

module.exports = (function VisualRenderer() {
  var _currentTime = +new Date();

  var OPTIMAL_FRAMERATE = 1000/60;

  var _heartData = [0, 0, 0];

  var _hearts = [new Heart("rgb(0, 0, 255)")]

  var _baseHeart = new BaseHeart();

  function addHeart(heart) {
    _hearts.push(heart);
  }

  function cleanUp() {
    for(var i in _hearts) {
      if(_hearts[i].shouldKill()) {
        _hearts.splice(i--, 1);
      }
    }
  };

  function update() {
    cleanUp();

    for(var i in _hearts) {
      _hearts[i].update();
    }

    for(var i in _heartData) {
      console.log(i + ": " + _heartData[i]);
      if (_heartData[i] > 140) {
        addHeart(new Heart("rgb(0, 0, 255)"));
      }
    }
  }

  function heartData(data) {
    _heartData = data;
  }

  function render(ctx, cw, ch) {
    for(i in _hearts) {
      _hearts[i].render(ctx, cw, ch);
    }
    _baseHeart.render(ctx,cw,ch, "rgb(255, 0, 0)");
  }

  return {
    heartData: heartData,
    update: update,
    render: render
  }
});
