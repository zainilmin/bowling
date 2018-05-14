var express = require('express');

class frame {

  constructor(id) {
    this.score = 0;
    this.strike =  false;
    this.spare = false;
    this.throwList = [0, 0, 0];
  }
}

module.exports = frame;
