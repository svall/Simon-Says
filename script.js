// Susana Isaza - Simon Says


// variables used to set up the board:
var modes = ['beginner', 'intermediate', 'extreme'];
var size = [4, 9, 9];
var colorsArray = ['red', 'green', 'lightblue', 'yellow', 'lightpurple', 'grey', 'pink', 'white', 'orange'];
var boardSize;

// level variables, number of color sequences displayed per level
var levelTimes = {
  l1: 1,
  l2: 1,
  l3: 1,
  l4: 1,
  l5: 1,
  l6: 1,
  l7: 1,
  l8: 1,
  l9: 1,
  l10: 1
  };
var sequenceLength = levelTimes.l1;

// variables that store the color sequences given to and entered by player
var colorsDisplayed = [];
var colorsPlayer1 = [];
var colorsPlayerBoxID = [];
var colorsPlayer2 = [];
var t;

// holds player info for this game
var gameScore = {}; // holds current game stats
var scoreBoard = []; // holds playerStats


// FUNCTIONS:

// LANDING PAGE:
// opens single/multi-player option when corresponding button is clicked
function stayOnSinglePlayer() {
  $('#singlePlayerForm').toggle();
}
function stayOnSPForm() {
  $('#singlePlayerForm').show();
}
function leaveSinglePlayer() {
  $('#singlePlayerInfo').toggle();
}
function stayOnMultiPlayer() {
  $('#multiPlayerForm').toggle();
}
function stayOnMPForm() {
  $('#multiPlayerForm').show();
}
function leaveMultiPlayer() {
  $('#multiPlayerInfo').hide();
}

// GAME PAGE:
// autoFill() adds values from landing form to corresponding place in game page
function autoFill () {
  var formSelections = window.location.search.substring(1).split("&");
  var playerName = formSelections[0].split('=');
  var gameMode = formSelections[1].split('=');
  if(formSelections.length === 2) {
    $('#playerName').text(playerName[1]);
    $('#modeOptions').text(gameMode[1]);
  }
  for(var i = 0; i < modes.length; i++) {
    if (gameMode[1] === modes[i]) {
      boardSize = size[i];
    }
  }
}

// setBoard() creates the board, assigns random colors
function setBoard() {
  for (var i = 0; i < (boardSize); i++) {
    // console.log('startGameBtn working');
    $('#colorContainer').append('<div class="colorBox">COLOR' + (i) + '</div>');
    $('.colorBox')[i].setAttribute('id', 'box' + (i));
    var randNum = Math.floor(Math.random() * colorsArray.length) + 0;
    $('.colorBox')[i].setAttribute('style', 'background-color: ' + colorsArray[randNum]);
    colorsArray.splice(randNum,1); // takes out of the array the color assigned for no repetitions
    // console.log(colorsArray);
  }
  if($('#modeOptions').text() === 'beginner') {
    $('#colorContainer').css('width', '40%');
  }
  if($('#modeOptions').text() === 'extreme') {
    $('.timerDisplay').css('display', 'in-line');
  }
  randomColorSequence();
}

// randomColorSequence() displays the random combination of colors, with 1 sec delay from click
function randomColorSequence() {
  // console.log('click works');
  for (var i = 1; i <= sequenceLength; i++) {
    t = setTimeout (function() {
      var colorBoxes = $('.colorBox');
      var randNum = Math.floor(Math.random() * colorBoxes.length) + 0; //rand# bet. 1-9
      console.log(randNum);
      colorBoxes.eq(randNum).animate({opacity: '1'}, 500);
      colorBoxes.eq(randNum).animate({opacity: '0.5'}, 500);
      colorsDisplayed.push(randNum);
    }, 1000 * i);
  }
  // console.log(colorsDisplayed);
  playerDelay();
}

// playerDelay() activates the hover and click events after the sequence is displayed
function playerDelay() {
  setTimeout(lightBoxes, (sequenceLength + 1) * 1000);
}

// lightBoxes() changes opacity of boxes hovered over
function lightBoxes() {
  $('.colorBox').mouseover(function(event) {
      // console.log('animation click works');
      $(this).css('opacity', '1');
  });
  $('.colorBox').mouseout(function(event) {
    // console.log('animation click works');
    $(this).css('opacity', '0.5');
  });
  $('.colorBox').on('click', playerSequenceInput);
}

// playerSequenceInput() saves the click inputs the player makes
function playerSequenceInput(event) {
  // console.log('playerseq. works');
  switch (this.id) {
    case 'box0':
      colorsPlayerBoxID.push(0);
      break;
    case 'box1':
      colorsPlayerBoxID.push(1);
      break;
    case 'box2':
      colorsPlayerBoxID.push(2);
      break;
    case 'box3':
      colorsPlayerBoxID.push(3);
      break;
    case 'box4':
      colorsPlayerBoxID.push(4);
      break;
    case 'box5':
      colorsPlayerBoxID.push(5);
      break;
    case 'box6':
      colorsPlayerBoxID.push(6);
      break;
    case 'box7':
      colorsPlayerBoxID.push(7);
      break;
    case 'box8':
      colorsPlayerBoxID.push(8);
      break;
  }
  // console.log(colorsPlayerBoxID);
  checkPlayerInput();
}

// checkPlayerInput() checks the sequence given vs. sequence typed by player
function checkPlayerInput() {
  nextMode();
  var correctCounter = 0;
  for (var i = 0; i < colorsPlayerBoxID.length; i++) {
    if (colorsPlayerBoxID[i] !== colorsDisplayed[i]) {
      // console.log('WRONG COLOR');
      alert('GAME OVER - WRONG COLOR');
      storeGameStats();
      resetLevel();
      resetSequence();
    }
    if (colorsPlayerBoxID[i] === colorsDisplayed[i]) {
      correctCounter++;
    }
    if (correctCounter === colorsDisplayed.length) {
      // console.log('CORRECT - NEXT LEVEL');
      showLevelPopup();
      resetSequence();
      nextLevel();

    }
  }
}

// storeGameStats() records the playerName, Level and Game Mode they reached (if higher than previous score)
function storeGameStats() {
  var plMode = $('#modeOptions').text();
  var plName = $('#playerName').text();
  var plScore = parseInt($('#levelDisplay').text()) - 1;
  gameScore.mode = plMode;
  gameScore.name = plName;
  gameScore.score = plScore;
  console.log(gameScore);
  // scoreBoard.push(gameScore);
  if (scoreBoard.length === 0) {
    console.log('first player');
    scoreBoard.push(gameScore);
    gameScore = {};
  } else {
    for (var i = 0; i < scoreBoard.length; i++) {
      console.log('entered loop');
      if (scoreBoard[i].name !== plName) { // new player
        console.log('new player');
        scoreBoard.push(gameScore);
        gameScore = {};
      } else if ((scoreBoard[i].name === plName) && (scoreBoard[i].mode !== plMode)) { // old player, new mode
        console.log('new mode');
        scoreBoard.push(gameScore);
        gameScore = {};
      } else if ((scoreBoard[i].name === plName) && (scoreBoard[i].mode === plMode)) { // old player, old mode
        if (scoreBoard[i].score >= plScore) {
          console.log('smaller score');
          alert('You have a previous higher or equal score, try again');
          gameScore = {};
        } else {
          console.log('record');
          scoreBoard[i].score = plScore;
          gameScore = {};
        }
      }
    }
  }
}


    // if ((scoreBoard[i].mode === plMode) && (scoreBoard[i].name === plName) && (scoreBoard[i].score >= plScore)) {
    //   console.log('smaller score');
    //   alert('You have a previous higher or equal score, try again');
    //   gameScore = {};
    // } else if ((scoreBoard[i].mode === plMode) && (scoreBoard[i].name === plName) && (scoreBoard[i].score < plScore)) {
    //   console.log('set record')
    //   scoreBoard[i].score = plScore;
    //   gameScore = {};
    // } else {
    //   console.log('new player');
    //   scoreBoard.push(gameScore);
    // }
//   }
// }

// createScoreBoard() displays the board with the top 3 scores when button "i" is clicked (hides board temporarily)
function createScoreBoard() {
  $('.finalScoreModal').toggle();
  $('.colorBox').toggle();
  // temporary store variables:
  var begN = '';
  var intN = '';
  var expN = '';
  var begS = 0;
  var intS = 0;;
  var expS = 0;;
  // variables to populate the board:
  var topBeg ='sfs';
  var topInt = 'sdfsdf';
  var topExt = 'sdfsdf';
  for (var i = 0; i < scoreBoard.length; i++) {
    switch(scoreBoard[i].mode) {
      case 'beginner':
        begN = scoreBoard[i].name;
        begS = scoreBoard[i].score;
        // console.log(begN);
          for (var a = 0; a < scoreBoard.length; a++) {
            if (begS < scoreBoard[a].score) {
              topBeg = scoreBoard[a].name;
            } else {
              topBeg = begN;
            }
          }
        break;
      case 'intermediate':
        intN = scoreBoard[i].name;
        begN = scoreBoard[i].score;
          for (var b = 0; b < scoreBoard.length; b++) {
            if (intS < scoreBoard[b].score) {
              topInt = scoreBoard[b].name;
            } else {
              topInt = intN;
            }
          }
        break;
      case 'extreme':
        extN = scoreBoard[i].name;
        extS = scoreBoard[i].score;
          for (var c = 0; c < scoreBoard.length; c++) {
            if (extS < scoreBoard[c].score) {
              topExt = scoreBoard[c].name;
            } else {
              topExt = extN;
            }
          }
        break;
    }
  }
  $('.finalScoreModal').text('TOP SCORES! Beginner: ' + topBeg + ', Intermediate: ' + topInt + ', Extreme: ' + topExt);
}

// showLevelPopup() displays the "Next Level" notice
function showLevelPopup() {
  $('.levelModal').css({
    visibility: 'visible',
    zIndex: '0.2'
  });
  setTimeout(function() {
    $('.levelModal').css({
      visibility: 'hidden',
      zIndex: '1'
    })}, 1000);
  setTimeout(setBoard, 1000);
}

// resetSequence() clers board and resets the sequence arrays displayed and entered
function resetSequence() {
  // console.log('reset btn');
  colorsDisplayed = [];
  colorsPlayer1 = [];
  colorsPlayerBoxID = [];
  colorsPlayer2 = [];
  $('.colorBox').remove();
  clearTimeout(t);
  colorsArray = ['red', 'green', 'lightblue', 'yellow', 'lightpurple', 'grey', 'pink', 'white', 'orange'];
}

// resetLevel() sets the Level displayed back to 1 when reset button is clicked
function resetLevel() {
  $('#levelDisplay').text(1);
  sequenceLength = levelTimes.l1;
}

// nextLevel() moves the player to the next level sequence
function nextLevel() {
  var level = parseInt($('#levelDisplay').text()); // level text
  // console.log(level);
  var newLevel = level + 1;
  // console.log(newLevel);
  $('#levelDisplay').text(level + 1);
  sequenceIncrement();
}

// sequenceIncrement() increments each level by 2 the sequence that will desplay
function sequenceIncrement() {
  var level = parseInt($('#levelDisplay').text());
  switch(level) {
    case 2:
      sequenceLength = levelTimes.l2;
      break;
    case 3:
      sequenceLength = levelTimes.l3;
      break;
    case 4:
      sequenceLength = levelTimes.l4;
      break;
    case 5:
      sequenceLength = levelTimes.l5;
      break;
    case 6:
      sequenceLength = levelTimes.l6;
      break;
    case 7:
      sequenceLength = levelTimes.l7;
      break;
    case 8:
      sequenceLength = levelTimes.l8;
      break;
    case 9:
      sequenceLength = levelTimes.l9;
      break;
    case 10:
      sequenceLength = levelTimes.l10;
      break;
    default:
      sequenceLength = levelTimes.l1;
  }
}

// nextMode() moves player to next mode available when all levels are completed
function nextMode() {
  if (($('#levelDisplay').text() === '10') && ($('#modeOptions').text() === 'beginner')) {
    alert('GREAT GAME - TRY YOUR LUCK WITH MORE BOXES')
    boardSize = 9;
    $('#modeOptions').text('intermediate');
    resetSequence();
    resetLevel();
    setBoard();
  }
  else if (($('#levelDisplay').text() === '10') && ($('#modeOptions').text() === 'intermediate')) {
    alert('GREAT GAME - TRY YOUR LUCK WITH THE EXTREME GAME')
    boardSize = 9;
    $('#modeOptions').text('extreme');
    resetSequence();
    resetLevel();
    setBoard();
    // timer(); // add timer to enter for extreme game
  }
  else if (($('#levelDisplay').text() === '10') && ($('#modeOptions').text() === 'extreme')) {
    alert('GAME MASTER')
    $('#modeOptions').text('MASTER');
    resetSequence();
    resetLevel();
  }
}

// timer() displays timer and gives a countdown time to enter the correct combination
// function timer() {
//   $('.displayTimer').show();
// }


// EVENTS:
$('document').ready(function() {
  // console.log('DOM Loaded ok!');

  // LANDING PAGE:
  $('#buttonLPSP').on('click', stayOnSinglePlayer);
  $('#singlePlayerForm').on('mouseover', stayOnSPForm);
  $('#singlePlayerForm').on('mouseleave', leaveSinglePlayer);
  // $('#buttonLPMP').on('mouseout', leaveSinglePlayer);
  $('#buttonLPMP').on('click', stayOnMultiPlayer);
  $('#multiPlayerForm').on('mouseover', stayOnMPForm);
  $('#multiPlayerForm').on('mouseout', leaveMultiPlayer);
  // $('#buttonLPMP').on('mouseout', leaveMultiPlayer);

  // GAME PAGE:
  autoFill();
  $('#startGameBtn').on('click', setBoard);
  // $('.colorBox').on('mouseover', popColors);
  // $('.colorBox').on('click', playerSequenceInput);
  $('#resetGameBtn').on('click', resetSequence);
  $('#resetGameBtn').on('click', resetLevel);
  $('#starImg').on('click', createScoreBoard);
});
