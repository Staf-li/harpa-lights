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

p.init = function(ip, patchdata, width, height, splatRenderer, cropFrame) {
	s.init.call(this, ip, patchdata, width, height);
	this.playwidth = Math.floor(this.width/1.5);
	this.playheight = this.height-1;
	this.playoffset = Math.floor((this.width - this.playwidth ) * 0.5);

	this.textEffect.renderText = true;
	this.waitEffect.renderText = true;

	this.splatRenderer = splatRenderer;
	this.cropFrame = cropFrame;
};

p.render = function(game, mode) {
	s.render.call(this, game, mode);
};

p._renderGame = function(game, mode) {
	if (mode == "game"){

	}

	this.ctx.save();
	//console.log(1/this.cropFrame.w);

	this.ctx.translate(this.cropFrame.translate.x, this.cropFrame.translate.y);
	this.ctx.scale(1.9, 1.4);

	this.splatRenderer.update(0, 1);
	this.splatRenderer.render(this.ctx, this.width, this.height, this.cropFrame);

	this.ctx.restore();

};

module.exports = HarpaGameView;