var checkException = require('../handler/pinsHandler').checkException;
var throwHandler = require('../handler/pinsHandler').throwHandler;
var game = require('../models/game');
var player = require('../models/player');

var gameNo = 0;
var gameTable = {};

module.exports = app => {
  app.get('/api/game', (req, res) => {
    var gameList = [];

    for(var key in gameTable) {
      gameList.push(key);
    }

    res.send(gameList);
  });

  app.post('/api/new/game', (req, res) => {
    gameTable[gameNo] = new game();

    gameNo++;
    res.send({"game_id": (gameNo - 1)});
  });

  app.post('/api/new/:gameid/:playername', (req, res) => {
    gameTable[req.params.gameid].players[req.params.playername] = new player();

     res.send({"result": "added new player " + req.params.playername});
  });

  app.get('/api/:gameid/players', (req, res) => {
    var playerList = [];
    for(var key in gameTable[req.params.gameid].players) {
      playerList.push(key);
    }

    res.send(playerList);
  });

  app.post('/api/:gameid/:playername/throw/:pins', (req, res) => {
    var currentPlayer = gameTable[req.params.gameid].players[req.params.playername];

    checkException(req.params.pins, currentPlayer, res);
    throwHandler(req.params.pins, currentPlayer, res);

    res.send({"Pins": req.params.pins + " pins were knocked"});
  });

  app.get('/api/score/:gameid/:playername', (req, res) => {
    var currentPlayer = gameTable[req.params.gameid].players[req.params.playername];

    res.send(currentPlayer.totalScore);
  });
}
