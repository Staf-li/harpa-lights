var BaseHeart = require("./BaseHeart.js");

module.exports = (function VisualRenderer() {
  var _currentTime = +new Date();

  var OPTIMAL_FRAMERATE = 1000/60;

  var _heartData = [0, 0, 0];

  var _hearts = [
    new BaseHeart("rgb(0, 0, 255)"), 
    new BaseHeart("rgb(0, 255, 0)"), 
    new BaseHeart("rgb(255, 0 , 0)")
  ];
  
  function update() {
    for(i in _hearts) {
      _hearts[i].update(_heartData[i]);
    };
  };

  function heartData(data) {
    _heartData = data;
  };

  function render(ctx, cw, ch) {
    ctx.clearRect(-cw-5, 0, 2*cw +5, ch*1.5);
    ctx.fillRect(-cw-5, 0, 2*cw +5, ch*1.5);
    for(i in _hearts) {
      _hearts[i].render(ctx, cw, ch);
    };
  };

  return {
    heartData: heartData,
    update: update,
    render: render
  };
});
