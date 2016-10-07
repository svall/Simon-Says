// Susana Isaza - Simon Says

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

// variables used to set up the board:
var modes = ['beginner', 'intermediate', 'extreme'];
var size = [4, 9, 9];
var colorsArray = ['red', 'green', 'lightblue', 'yellow', 'lightpurple', 'grey', 'pink', 'white', 'orange'];
var boardSize;

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
  // if($('#modeOptions').text() === 'extreme') {
  //   $('.timerDisplay').css('display', 'in-line');;
  // }
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
    $('#colorContainer').css('width', '60%');
    $('.colorBox').css({
      height: '180px',
      width: '180px'
    });
  }
  if(($('#modeOptions').text() === 'intermediate') || ($('#modeOptions').text() === 'extreme')) {
    $('#colorContainer').css('width', '50%');
  }
  if($('#modeOptions').text() === 'extreme') {
    $('.timerDisplay').css('display', 'in-line');
  }
  randomColorSequence();
}

// level variables, number of color sequences displayed per level
var levelTimes = {
  l1: 1,
  l2: 1,
  l3: 2,
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

// randomColorSequence() displays the random combination of colors, with 1 sec delay from click
function randomColorSequence() {
  // console.log('click works');
  for (var i = 1; i <= sequenceLength; i++) {
    t = setTimeout (function() {
    // setTimeout (function() {
      var colorBoxes = $('.colorBox');  // colorBox array
      var randNum = Math.floor(Math.random() * colorBoxes.length) + 0; //rand# bet. 1-8
      console.log(randNum);
      // $('.colorBox').eq(randNum).css('box-shadow', '0 10px 50px 20px red');
      colorBoxes.eq(randNum).animate({opacity: '1'}, 500);
      colorBoxes.eq(randNum).animate({opacity: '0.5'}, 500);
      colorsDisplayed.push(randNum);
    }, 1000 * i);
  }
  console.log(colorsDisplayed);
  lightHoverDelay();
  $('.colorBox').on('click', playerSequenceInput);
}

// lightHoverDelay() activates the hover effect after the sequence is displayed
function lightHoverDelay() {
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
  console.log(colorsPlayerBoxID);
  checkPlayerInput();
}

// checkPlayerInput() checks the sequence given vs. sequence typed by player
function checkPlayerInput() {
  nextMode();
  var correctCounter = 0;
  for (var i = 0; i < colorsPlayerBoxID.length; i++) {
    if (colorsPlayerBoxID[i] !== colorsDisplayed[i]) {
      console.log('WRONG COLOR');
      alert('WRONG COLOR');
      resetSequence();
    }
    if (colorsPlayerBoxID[i] === colorsDisplayed[i]) {
      correctCounter++;
    }
    if (correctCounter === colorsDisplayed.length) {
      console.log('CORRECT - NEXT LEVEL');
      alert('CORRECT - NEXT LEVEL');
      resetSequence();
      nextLevel();
      setBoard();
    }
  }
}

// resetSequence() clers board and resets the sequence arrays displayed and entered
function resetSequence() {
  console.log('reset btn');
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
  console.log(level);
  var newLevel = level + 1;
  console.log(newLevel);
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
  console.log(sequenceLength);
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
function timer() {
  $('.displayTimer').show();
}



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
});
