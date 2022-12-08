# Final Project

In this project, you'll build a web application that does anything you want! 

It must meet the project requirements below, but beyond that, feel free to use your creativity to decide on what your app will do.

## Requirements

* **Your app has at least three distinct "features"**
  * If you are building a travel planning application, one feature could be allowing users to create a new trip
* Your project has at least ten commits in git
* Your app is mobile responsive
* Your project contains a `README.md` file that explains what your project is and how to use it
* Your project is hosted on GitHub pages
* Your code is clean
  * Proper indentation
  * No unnecessary repetition
  * Variables as camelCase

## Project ideas

* Travel planner
* Budget manager
* Resume builder
* Shift scheduling app
* Chat bot
* Music making app
* Games
  * PacMan
  * Chess
* Do something with an external API: https://github.com/public-apis/public-apis
  * Slack / discord bot
  * Recreate Reddit
  * Pokedex

And so many more possibilities!

## Recommendations

* Start out by creating your project's foundation in HTML.
* Frequently make commmits in git to save your progress.
* Build one piece of Javascript functionality at a time, testing each change you make with `console.log`. 
* Keep your code meticulously organized as you go. 
* Use proper indentation, whitespace, and comments. 
* Try to write a function for each separate piece of functionality that exists in your code. This will make your code "modular" and easier to build off of.
* If you find yourself repeating code, think about how you could use either a loop or a new function to eliminate the repitition.

# Tetris Clone

## Controls

Arrow Up = rotate tetromino

Arrow Left = move left

Arrow Right = move right

Arrow Down = fast drop

Spacebar = hard drop

## Buttons

Puase = Puase/Unpuase

Restart = Restart game once the game is over.

Play = Start playing the game the first time.

## Next Piece

Display the next tetromino. 

## Score and Levels

Every 400 points the level increases and the speed at which the tetromino drops is increased.

Multiple rows removed at the same time result in a a multiplier by how many rows are removed.

Each row is worth 10 points.

Therefore if you were to remove 2 rows at the same time your score would increase by 40 points.

Level 1 = 1000ms

Level 2 = 900ms

Level 3 = 800ms

Level 4 = 700ms

Level 5 = 600ms

Level 6 = 500ms

Level 7 = 400ms

Level 8 = 300ms

Level 9 = 200ms

Level 10 = 100ms

Level 11 = 50ms

Level 12 = 20ms
