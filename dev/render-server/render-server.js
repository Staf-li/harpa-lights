var AppConfig = require("../common/Config.js");

var winston = require('winston');
var io = require('socket.io-client');
var Utils = require('../common/Utils.js').Utils;
var Scheduler = require("./scheduler/Scheduler.js");
var http = require('http');
var NanoTimer = require('nanotimer');
var fs = require("fs");
var zmq = require("zmq");
var Canvas = require("canvas");
var Image = Canvas.Image;

var SplatRenderer = require('./views/splat-renderer.js');

var front_patch = require('./patchdata/front-main-patch-3-extended.js');
var side_patch = require('./patchdata/side-patch-1.js');

var frontTransform = {
  t: {
  	x: -20,
  	y: -2.2,
  },
  s: {
  	x: 2.33,
  	y: 1
  }

};

var sideTransform = {
  t: {
  	x: -1,
  	y: -4
  },
  s: {
  	x: 2,
  	y: 1
  }
};

// Paint Splatter specific classes
var HarpaSplatterView = require('./views/HarpaSplatterView.js');
var Blob = require("./views/blob.js")
// ————

var INTERFACE_1_IP = "2.224.168.149";
var INTERFACE_2_IP = "2.145.222.186";

var SCREENSAVER_SERVER_IP = "tcp://127.0.0.1";

// change between local & remote game servers
// var GAME_SERVER_IP = "http://127.0.0.1";
var GAME_SERVER_IP = "http://paint.is";//+ AppConfig.ips.game_server.url;
//
var active = true;

console.log("**************************************************");
console.log("*                                                *");
console.log("*                  HARPA PONG!                   *");
console.log("*                                                *");
console.log("*                 RENDER SERVER                  *");
console.log("*                                                *");
console.log("*  .-.     .-.     .-.     .-.     .-.     .-.   *");
console.log("*.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._*");
console.log("*                                                *");
console.log("**************************************************");
console.log("*                                                *");
console.log("*               2014 Owen Hindley                *");
console.log("*               github.com/owenhindley           *");
console.log("*                                                *");
console.log("**************************************************");
console.log("");
console.log('Starting...');

winston.add(winston.transports.File, { filename: 'render.log', handleExceptions : false });
winston.info("started renderer");

var scheduler = new Scheduler();

var harpaFaces = {
	"front" : [38,13],
	"side" : [39,9]
};

// var gameView = new HarpaGameView();
// gameView.init(INTERFACE_1_IP, front_patch, harpaFaces.front[0], harpaFaces.front[1]);

// scoreView.init(INTERFACE_2_IP, side_patch, harpaFaces.side[0], harpaFaces.side[1]);

// Shared splat renderer
var splatRenderer = new SplatRenderer();

var splatterView = new HarpaSplatterView();
splatterView.init(INTERFACE_1_IP, front_patch,
	harpaFaces.front[0], harpaFaces.front[1],
	splatRenderer, frontTransform);

var secondSplatterView = new HarpaSplatterView();
secondSplatterView.init(INTERFACE_2_IP, side_patch,
	harpaFaces.side[0], harpaFaces.side[1],
	splatRenderer, sideTransform);

var renderTimer = new NanoTimer();
renderTimer.setInterval(render.bind(this), '', '33m');

var game = {};

var socket = io('http://paint-splatter.herokuapp.com');

socket.on('connection', function (e) {
	console.log("Connected to socket server.");
})

socket.on('blob', function(data) {
	splatRenderer.addSplat(new Blob(data.x, data.y, data.color, data.weather, 0.6666));
	
	// Log blob in file
	if(data.isGhost !== true) {
		winston.info({data: data, time: new Date()});
	}
});

function render() {
	splatterView.render(game, "game");
	secondSplatterView.render(game, "game");
};

/*
	Global scheduler, manages overall state of lights
	game, blackout, screensaver etc
*/

function updateScheduler() {
	scheduler.update();
}

setInterval(updateScheduler.bind(this), 60 * 1000);
updateScheduler();

// DEBUGGING
//

var server = http.createServer(function(request, response){
	var queryComponents = Utils.parseQueryString(request.url);

	var method = null;
	var responseText = "";

	if (queryComponents["method"]){
		method = queryComponents["method"];
		responseText = "called method : " + method;

		switch(method){
			case "getCanvas":
				responseText = fs.readFileSync("./html/showCanvas.html", "utf8");
			break;

			case "getGameCanvasSource":
				responseText = splatterView.canvas.toDataURL();
			break;

			case "getScoreCanvasSource":
				responseText = secondSplatterView.canvas.toDataURL();
			break;

			case "stop":
				active = false;
			break;

			case "start":
				active = true;
			break;

			case "blackout":
				gameView.blackout();
				scoreView.blackout();
				active = false;
			break;

			case "blind":
				gameView.blind();
				scoreView.blind();
				active = false;
			break;

			case "mode_game":
				scheduler.mode = Scheduler.MODE_GAME;
			break;

			case "mode_shimmer":
				scheduler.mode = Scheduler.MODE_SHIMMER;
			break;

			case "mode_screensaver":
				scheduler.mode = Scheduler.MODE_SCREENSAVER;
			break;
		}
	}

	response.writeHead(200, {
		'Content-Type': 'text/html',
		'Access-Control-Allow-Origin' : '*'
	});

	response.end(responseText);
});

server.listen(8088);
