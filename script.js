document.addEventListener("DOMContentLoaded", function(event) {
  console.log('DOM Loaded ok!');

  $('#startGameBtn').click(setBoard);
  // $('#startGameBtn').click(shuffleColor);
});
// setBoard() creates the board
function setBoard() {
  for (var i = 0; i < 4; i++) {
    var colorsArray = ['red', 'green', 'blue', 'yellow'];
    // var colorToAdd = colorsArray[i];
    console.log('startGameBtn working');
    $('#colorContainer').append('<div class="colorBox">COLOR' + (i + 1) + '</div>');
    $('.colorBox')[i].setAttribute('id', 'box' + (i + 1));
    $('.colorBox')[i].setAttribute('style', 'background-color: ' + colorsArray[i]);

    // shuffleColor();
  }



  // // shuffleColor() assigns color order randomly when button start is clicked
  // function shuffleColor() {
  //   var colorsArray = ['red', 'blue', 'green', 'yellow'];
  //   var allColorBoxes = $('.colorBox');




    // for (var i = 0; i < allColorBoxes.length; i++) {
    //   // var randNum = Math.floor(Math.random() * allColorBoxes) + 0;
    //   var randNum = 0;
    //   console.log('number is ' + randNum);
    //   $('allColorBoxes')[i].css('background-color', 'colorsArray[' + randNum + ']');
    //   colorsArray.splice(randNum,1);
    // }
    // for (var i = 0; i < $('.colorBox').length; i++) {
    //   var randNum = Math.floor(Math.random()*($('.colorBox').length))+ 0;
    //   console.log(randNum);
    // }
  // }
}
