
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





document.addEventListener("DOMContentLoaded", function(event) {
  console.log('DOM Loaded ok!');
  $('#startGameBtn').click(setBoard);
});
