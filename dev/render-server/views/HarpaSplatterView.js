var Canvas = require("canvas");
var winston = require("winston");

var HarpaBaseView = require("./HarpaBaseView.js");

var Blob = require("./blob.js");

var tX = 0;
var tY = 0;

var HarpaGameView = function(){

};

var p = HarpaGameView.prototype = new HarpaBaseView();
var s = HarpaBaseView.prototype;

p.init = function(ip, patchdata, width, height, splatRenderer, transform) {
	s.init.call(this, ip, patchdata, width, height);
	this.playwidth = Math.floor(this.width/1.5);
	this.playheight = this.height-1;
	this.playoffset = Math.floor((this.width - this.playwidth ) * 0.5);

	this.textEffect.renderText = true;
	this.waitEffect.renderText = true;

	this.splatRenderer = splatRenderer; 
	this.transform = transform;
};

p.render = function(game, mode) {
	s.render.call(this, game, mode);
};

p._renderGame = function(game, mode) {
	this.ctx.save();

	this.splatRenderer.update();
	this.ctx.scale(this.transform.s.x, this.transform.s.x);
	this.ctx.translate(this.transform.t.x, this.transform.t.y);
	this.splatRenderer.render(this.ctx, this.width, this.width, 0.2);

	this.ctx.restore();

};

module.exports = HarpaGameView;