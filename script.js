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
//

function autoFill () {
  var formSelections = window.location.search.substring(1).split("&");
  if(formSelections.length === 2) {
    var playername = formSelections[1].split('=');
    // var gamemode = formSelections[2].split('=');
    $('#playername').setAttribute('value', playername[1]);


  }
  // var playersInfo = {};
  // for (var i = 0; i < formSelections.length; i++) {
  //   var info = formSelections[i].split('=');
  //   playersInfo.add(info[0] + ': ' + info[1]);
  //   // playersInfo += info[0] + ': ' + info[1] + ', ';
  //   console.log(playersInfo);
  // }
  // console.log(playersInfo.playername);

}



// setBoard() creates the board, assigns random colors
function setBoard() {
  var colorsArray = ['red', 'green', 'blue', 'yellow'];
  for (var i = 0; i < 4; i++) { // 4 needs to change to the # of colors pending mode selection
    console.log('startGameBtn working');
    $('#colorContainer').append('<div class="colorBox">COLOR' + (i + 1) + '</div>');
    $('.colorBox')[i].setAttribute('id', 'box' + (i + 1));
    var randNum = Math.floor(Math.random() * colorsArray.length) + 0;
    $('.colorBox')[i].setAttribute('style', 'background-color: ' + colorsArray[randNum]);
    colorsArray.splice(randNum,1);
    console.log(colorsArray);
  }
}


// EVENTS:
$('document').ready(function() {
  console.log('DOM Loaded ok!');
  // Landing Page
  $('#buttonLPSP').on('click', stayOnSinglePlayer);
  $('#singlePlayerForm').on('mouseover', stayOnSPForm);
  $('#singlePlayerForm').on('mouseleave', leaveSinglePlayer);
  // $('#buttonLPMP').on('mouseout', leaveSinglePlayer);
  $('#buttonLPMP').on('click', stayOnMultiPlayer);
  $('#multiPlayerForm').on('mouseover', stayOnMPForm);
  $('#multiPlayerForm').on('mouseout', leaveMultiPlayer);
  // $('#buttonLPMP').on('mouseout', leaveMultiPlayer);

  // Game Page
  $('#startGameBtn').on('click', setBoard);
});
