var express = require('express');
var frame = require('./frame');

class player {

  constructor () {
    this.frameNo = 0;
    this.throwNo = 0;
    this.frame = [];
    this.totalScore = [];

    for(var i = 0; i <= 9; i++) {
      this.frame[i] = new frame(i);
      this.totalScore[i] = 0;
    }
  }
}

module.exports = player;
