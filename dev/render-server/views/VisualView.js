var Canvas = require("canvas");
var winston = require("winston");

var HarpaBaseView = require("./HarpaBaseView.js");

var tX = 0;
var tY = 0;

var HarpaGameView = function(){

};

var p = HarpaGameView.prototype = new HarpaBaseView();
var s = HarpaBaseView.prototype;

p.init = function(ip, patchdata, width, height, VisualRenderer, transform) {
	s.init.call(this, ip, patchdata, width, height);
	this.playwidth = width;
	console.log()
	this.playheight = height;
	this.playoffset = 0;

	this.textEffect.renderText = true;
	this.waitEffect.renderText = true;

	this.VisualRenderer = VisualRenderer; 
	this.transform = transform;
};

p.render = function(game, mode) {
	s.render.call(this, game, mode);
};

p._renderGame = function(game, mode) {
	this.ctx.save();

	this.VisualRenderer.update();
	this.ctx.scale(this.transform.s.x, this.transform.s.x);
	this.ctx.translate(this.transform.t.x, this.transform.t.y);
	this.VisualRenderer.render(this.ctx, this.width, this.height, 0.2);

	this.ctx.restore();
};

module.exports = HarpaGameView;