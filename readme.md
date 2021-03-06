Project 1 - Simon Says
Susana Isaza

Host link: https://svall.github.io/Simon-Says/


Sample landing page: https://www.webprofits.com.au/backlinks/
Screenshot:
![alt tag](./images/LandingPageModel.png)

Wireframe:
- Beginner Level (2x2) - https://wireframe.cc/Ja94Mc
- Intermediate & Extreme Level (3x3) - https://wireframe.cc/kKeST1


Game Outline:
- Landing Page: The player must enter his or her name and select a Game Mode to play. The Beginner mode has 4 colors (2x2 grid), Intermediate and Extreme have 9 colors (3x3 grid). Once name and mode are completed, the PLAY button will direct the player to the game.<br>
- Game Page: The game displays a color sequence when the player clicks the START button. The player has to pay close attention and wait for the sequence to finish. The player then has to enter the same color combination in the same order to move to the next level. Each time the player successfully completes a level, the color sequence to be displayed increases by 1, until completing level 10. If all levels in a Game Mode are completed, the player moves on to the next Game Mode until completing the Extreme Mode (where colors are displayed twice as fast as in the Beginner and Intermediate Modes. If a combination is entered incorrectly, an alert will inform the player the game is over, and the player will have to start from level 1.<br>
If a player wants to restart the game, clicking the “RESET” button will move back to Level 1 of that Game Mode.
Each game saves the player name, score and last successful level they completed.


Technology used:
- Structure and Styling:
HTML/CSS are used to crete the structure and styling of both landing and game pages. Images are added directly to the HTML structure to be displayed as icons and the initial image in the landing page.
The grid in the game page is created dynamically when the START button is clicked. It is set up with flexbox.
Media queries are set up for tablets at 600px screen.

- Functionality:
JQuery is used for the functionality of the game. It is used to manipulate the DOM to display the random color sequences, as well as store and compare them with the sequences entered by players.
The main triggers for functionality are event listeners set up with button clicks, mouseover, and mouseout.
The display sequences are controlled with setTimeout() methods with short display times.
The opacity for each color box is manipulated using animate() to improve the visual display of each color during the sequence.
The toggle() method is used to show and hide the scoreboard and instructions when clickin on the corresponding links.


Current Issues:
1. The score for each game is saved to the gameScore object. Each time gameScore is used, the object is pushed to the scoreBoard array.
In order to only save one score per mode per player, a loop in the scoreBoard array contrasts the new score with any existing ones and replaces it if it is higher.
The main issue that the scoreBoard array gets erased when the player leaves the page, either back to the landing page or reloads it.
2. Setting up the game with OOP to add multiple players.

