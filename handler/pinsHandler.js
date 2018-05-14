function checkException(pins, currentPlayer, res) {

  var throwNo = currentPlayer.throwNo;
  var frameNo = currentPlayer.frameNo;

  if(pins < 0 || pins > 10) {
    res.send({"error": "Pins cannot be greater than 10 or less than 0"});
  }
  if(throwNo > 2 || frameNo > 9) {
    res.send({"error": "Game Finished! Please start new game"});
  }
}

function throwHandler(pins, currentPlayer, res) {
  var throwNo = parseInt(currentPlayer.throwNo);
  var frameNo = parseInt(currentPlayer.frameNo);
  console.log(currentPlayer);
  currentPlayer.frame[frameNo].throwList[throwNo] = parseInt(pins);

  var frameThrow1 = parseInt(currentPlayer.frame[frameNo].throwList[0]);
  var frameThrow2 = parseInt(currentPlayer.frame[frameNo].throwList[1]);
  var frameThrow3 = parseInt(currentPlayer.frame[frameNo].throwList[2]);

  if(pins == 10 && throwNo == 0 && frameNo < 9) {
    currentPlayer.frame[frameNo].strike = true;
    currentPlayer.throwNo++;
  }

  if(throwNo == 1) {
    var droppedPins = frameThrow1 + pins;
    if(droppedPins == 10) {
      currentPlayer.frame[frameNo].spare = true;
    }
  }

  if(frameNo == 9) {
    currentPlayer.frame[frameNo].score = frameThrow1 + frameThrow2 + frameThrow3;
  } else {
    currentPlayer.frame[frameNo].score = frameThrow1 + frameThrow2;
  }

  var runningScore = 0;
  for(var i = 0; i <= currentPlayer.frameNo; i++) {
    runningScore += currentPlayer.frame[i].score;
  }
  currentPlayer.totalScore[frameNo] = runningScore;

  if(throwNo == 1) {
    if(frameNo == 9 && currentPlayer.frame[frameNo].strike || currentPlayer.frame[frameNo].spare) {
      currentPlayer.throwNo++;
    } else {
      currentPlayer.frameNo++;
      currentPlayer.throwNo = 0;
    }
  } else {
    currentPlayer.throwNo++;
  }
}

module.exports = {
  checkException: checkException,
  throwHandler: throwHandler
}
