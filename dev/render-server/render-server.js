var AppConfig = require('../common/Config.js');

var winston = require('winston');
var io = require('socket.io-client');
var Utils = require('../common/Utils.js').Utils;
var Scheduler = require('./scheduler/Scheduler.js');
var http = require('http');
var NanoTimer = require('nanotimer');
var fs = require('fs');
var zmq = require('zmq');
var Canvas = require('canvas');
var Image = Canvas.Image;

// Generalized view class and a renderer to render the view
var VisualView = require('./views/VisualView.js');

var VisualRenderer = require('./views/visual-renderer.js');

var front_patch = require('./patchdata/front-main-patch-3-extended.js');
var side_patch = require('./patchdata/side-patch-1.js');

var HEART_SERVER_IP = 'localhost';

var frontTransform = {
  t: {
    x: 0,
    y: 0,
  },
  s: {
    x: 1,
    y: 1,
  },
};

var sideTransform = {
  t: {
    x: 40,
    y: -3,
  },
  s: {
    x: 1,
    y: 1,
  },
};

var INTERFACE_1_IP = '2.224.168.149';
var INTERFACE_2_IP = '2.145.222.186';

var active = true;

console.log('**************************************************');
console.log('*                                                *');
console.log('*                                                *');
console.log('*                 RENDER SERVER                  *');
console.log('*                                                *');
console.log('*  .-.     .-.     .-.     .-.     .-.     .-.   *');
console.log("*.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._*");
console.log('*                                                *');
console.log('**************************************************');
console.log('*                                                *');
console.log('*               2014 Owen Hindley et al.         *');
console.log('*               github.com/owenhindley           *');
console.log('*                                                *');
console.log('**************************************************');
console.log('');
console.log('Starting...');

winston.add(winston.transports.File, { filename: 'render.log', handleExceptions: false });
winston.info('started renderer');

var scheduler = new Scheduler();

var harpaFaces = {
  front: [38, 13],
  side: [39, 9],
};

var visualRenderer = new VisualRenderer();

var visualView = new VisualView();
visualView.init(
  INTERFACE_1_IP,
  front_patch,
  harpaFaces.front[0],
  harpaFaces.front[1],
  visualRenderer,
  frontTransform
);

var secondVisualView = new VisualView();
secondVisualView.init(
  INTERFACE_2_IP,
  side_patch,
  harpaFaces.side[0],
  harpaFaces.side[1],
  visualRenderer,
  sideTransform
);

var renderTimer = new NanoTimer();
renderTimer.setInterval(render.bind(this), '', '33m');

var game = {};

var socket = io('http://' + HEART_SERVER_IP + ':9090');

socket.on('connection', function() {
  console.log('Connect');
});

socket.on('heartDataOne', function(data) {
  visualRenderer.upDateheartData(0);
});

socket.on('heartDataTwo', function(data) {
  visualRenderer.upDateheartData(1);
});

socket.on('heartDataThree', function(data) {
  visualRenderer.upDateheartData(2);
});

/*
var socket = io('http://');

socket.on('connection', function (e) {
	console.log("Connected to socket server.");
})

socket.on('blob', function(data) {
	VisualRenderer.addSplat(new Blob(data.x, data.y, data.color, data.weather, 0.6666));

	// Log blob in file
	if(data.isGhost !== true) {
		winston.info({data: data, time: new Date()});
	}
});
*/

function render() {
  visualView.render(game, 'game');
  secondVisualView.render(game, 'game');
}

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

var server = http.createServer(function(request, response) {
  var queryComponents = Utils.parseQueryString(request.url);

  var method = null;
  var responseText = '';

  if (queryComponents['method']) {
    method = queryComponents['method'];
    responseText = 'called method : ' + method;

    switch (method) {
      case 'getCanvas':
        responseText = fs.readFileSync('./html/showCanvas.html', 'utf8');
        break;

      case 'getGameCanvasSource':
        responseText = visualView.canvas.toDataURL();
        break;

      case 'getScoreCanvasSource':
        responseText = secondVisualView.canvas.toDataURL();
        break;

      case 'stop':
        active = false;
        break;

      case 'start':
        active = true;
        break;

      case 'blackout':
        gameView.blackout();
        scoreView.blackout();
        active = false;
        break;

      case 'blind':
        gameView.blind();
        scoreView.blind();
        active = false;
        break;

      case 'mode_game':
        scheduler.mode = Scheduler.MODE_GAME;
        break;

      case 'mode_shimmer':
        scheduler.mode = Scheduler.MODE_SHIMMER;
        break;

      case 'mode_screensaver':
        scheduler.mode = Scheduler.MODE_SCREENSAVER;
        break;
    }
  }

  response.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*',
  });

  response.end(responseText);
});

server.listen(8088);
