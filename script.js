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
// autoFill() adds values from landing form to corresponding place
function autoFill () {
  var formSelections = window.location.search.substring(1).split("&");
  if(formSelections.length === 2) {
    var playerName = formSelections[0].split('=');
    var gameMode = formSelections[1].split('=');
    $('#playerName').text(playerName[1]);
    $('#modeOptions').text(gameMode[1]);
  }
}

var colorsArray = ['red', 'green', 'lightblue', 'yellow', 'lightpurple', 'grey', 'pink', 'white'];
// setBoard() creates the board, assigns random colors
function setBoard() {
  var boardSize = 4;
  // var colorsArray = ['red', 'green', 'blue', 'yellow', 'purple', 'grey', 'pink', 'white'];
  // for (var i = 0; i < (boardSize / 2); i++) { // 4 needs to change to the # of colors pending mode selection
  for (var i = 0; i < (boardSize); i++) {
    console.log('startGameBtn working');
    // $('#colorContainer').append('<tr class="tableRow"></tr>');
    // for (var j = 0; j < (boardSize / 2); i++) {
    //   $('tableRow').append('<td class="colorBox">COLOR' + (j + 1) + '</td>');
    //   // $('.colorBox').eq(j).setAttribute('id', 'box' + (j + 1));
    //   var randNum = Math.floor(Math.random() * colorsArray.length) + 0;
    //   $('.colorBox').eq(j).css('background-color', colorsArray[randNum]);
    //   colorsArray.splice(randNum,1);
    // }
    $('#colorContainer').append('<div class="colorBox">COLOR' + (i + 1) + '</div>');
    $('.colorBox')[i].setAttribute('id', 'box' + (i + 1));
    var randNum = Math.floor(Math.random() * colorsArray.length) + 0;
    $('.colorBox')[i].setAttribute('style', 'background-color: ' + colorsArray[randNum]);
    colorsArray.splice(randNum,1); // takes out of the array the color assigned for no repetitions
    // console.log(colorsArray);
  }
  randomColorSequence();
}


// number of color sequences displayed per level
var levelTimes = {
  l1: 6,
  l2: 8,
  l3: 10,
  l4: 12,
  l5: 14,
  l6: 16,
  l7: 18,
  l8: 20,
  l9: 22,
  l10: 24
};
// color sequence variables
var colorsDisplayed = [];
var colorsPlayer1 = [];
var colorsPlayerBoxID = [];
var colorsPlayer2 = [];

// randomColorSequence() displays the random combination of colors, with 1 sec delay from click
function randomColorSequence() {
  // console.log('click works');
  for (var i = 1; i <= levelTimes.l1; i++) {
    setTimeout (function() {
      var colorBoxes = $('.colorBox');  // colorBox array
      var randNum = Math.floor(Math.random() * colorBoxes.length) + 0; //rand# bet. 1-4
      console.log(randNum);
      // $('.colorBox').eq(randNum).css('box-shadow', '0 10px 50px 20px red');
      colorBoxes.eq(randNum).animate({opacity: '1'}, 500);
      colorBoxes.eq(randNum).animate({opacity: '0.15'}, 500);
      colorsDisplayed.push(randNum);
    }, 1000 * i);
  }
  console.log(colorsDisplayed);
  lightHoverDelay();
  $('.colorBox').on('click', playerSequenceInput);
}

// lightHoverDelay() activates the hover effect after the sequence is displayed
function lightHoverDelay() {
  setTimeout(lightBoxes, levelTimes.l1 * 1000); // need to change l1!!!
}

// lightBoxes() changes opacity of boxes hovered over
function lightBoxes() {
  $('.colorBox').mouseover(function(event) {
      // console.log('animation click works');
      $(this).css('opacity', '1');
  });
  $('.colorBox').mouseout(function(event) {
    // console.log('animation click works');
    $(this).css('opacity', '0.15');
  });
}

// playerSequenceInput() saves the click inputs the player makes
function playerSequenceInput(event) {
  // console.log('playerseq. works');
  switch (this.id) {
    case 'box1':
      colorsPlayerBoxID.push(0);
      break;
    case 'box2':
      colorsPlayerBoxID.push(1);
      break;
    case 'box3':
      colorsPlayerBoxID.push(2);
      break;
    case 'box4':
      colorsPlayerBoxID.push(3);
      break;
  }
  console.log(colorsPlayerBoxID);
  checkPlayerInput();
}

// checkPlayerInput() checks the sequence given vs. sequence typed by player
function checkPlayerInput() {
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
      // nextLevel();
    }
  }
}

// resetSequence() resets the sequence arrays displayed and entered
function resetSequence() {
  console.log('reset btn');
  colorsDisplayed = [];
  colorsPlayer1 = [];
  colorsPlayerBoxID = [];
  colorsPlayer2 = [];
}

// popColors() changes the opacity of divs hovered over
// function popColors(event) {
//   var colorBoxes = $('.colorBox');  // colorBox array
//   colorBoxes.eq(this).animate({opacity: '1'}, 500);
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
});
