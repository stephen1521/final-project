//creating boards
//globals for creating boards
let board = document.querySelector('#board');
let nextPiece = document.querySelector('#nextPiece');
//creates main board
let createBoard = () => {
    // loop and create a div and append to board, add boardDiv class
    for(let i = 0; i < 200; i++){
        let boardDiv = document.createElement('div');
        boardDiv.classList.add('boardDiv');
        board.appendChild(boardDiv);
    }
    // loop and cfeate a div and append to board, add stop class
    for(let i = 0; i < 10; i++){
        let stopDiv = document.createElement('div');
        stopDiv.classList.add('stop');
        board.appendChild(stopDiv);
    }
}
//creates next piece board
let createNextPieceBoard = () => {
    //loop and create a div and append to next piece display, add boardiv class
    for(let i = 0; i < 16; i++){
        let boardDiv = document.createElement('div');
        boardDiv.classList.add('boardDiv');
        nextPiece.appendChild(boardDiv);
    }
}
createBoard();
createNextPieceBoard();

//globals for game
//width of game board 10 divs
let width = 10;
//starting position for tetromino 4 and keeps track of current tetromino position
let currentPosition = 4;
//keeps track of what rotation the tetromino is on. starting position is 0
let currentRotation = 0;
//width of next piece display is 4 divs
let nextPieceDisplayWidth = 4;
// starting position for next piece
let nextPiecePosition = 0;
// next random keeps track of next tetromino to be selected
let nextRandom = 0;
// keeps track of a game currently playing
let isPlaying = false;
// keeps track of game over
let isGameOver = false;
// keeps track of game being puased
let isPuased = false;
// if play button has not been clicked yet
let neverPlaying = false;
// all 7 tetrominoes and their rotations
// l tetromino and its 4 rotations
let lTetromino = [
    [1, width+1, width*2+1, width*2+2],
    [width, width+1, width+2, width*2],
    [0, 1, width+1, width*2+1],
    [width, width+1, width+2, 2]
];
// j tetromino and its 4 rotations
let jTetromino = [
    [1, width+1, width*2+1, width*2],
    [0, width, width+1, width+2],
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2]
]
// s tetromino and its 4 rotations
let sTetromino = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
];
// z tetromino and its 4 rotations
let zTetromino = [
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2],
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2]
]
//t tetromino and its 4 rotations
let tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
];
// square tetromino and its 4 rotations
let oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
];
// I tetromno and its 4 rotations
let iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
];
// tetrominoes for next piece display
// contains the starting rotations for each of the 7 tetrominos
let nextPieceTetrominoes = [
    [1, nextPieceDisplayWidth+1, nextPieceDisplayWidth*2+1, nextPieceDisplayWidth*2+2],
    [1, nextPieceDisplayWidth+1, nextPieceDisplayWidth*2+1, nextPieceDisplayWidth*2],
    [nextPieceDisplayWidth+1, nextPieceDisplayWidth+2, nextPieceDisplayWidth*2, nextPieceDisplayWidth*2+1],
    [nextPieceDisplayWidth, nextPieceDisplayWidth+1, nextPieceDisplayWidth*2+1, nextPieceDisplayWidth*2+2],
    [1, nextPieceDisplayWidth, nextPieceDisplayWidth+1, nextPieceDisplayWidth+2],
    [0, 1, nextPieceDisplayWidth, nextPieceDisplayWidth+1],
    [1, nextPieceDisplayWidth+1, nextPieceDisplayWidth*2+1, nextPieceDisplayWidth*3+1],
];
//globals
// array of all tetrominos
let tetrominoes = [lTetromino, jTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
// array of all divs inside the board
let boardSquares = Array.from(document.querySelectorAll('#board div'));
// randomly generate a number for next tetromino
let random = Math.floor(Math.random() * tetrominoes.length);
// current tetromino being dropped
let currentTetromino = tetrominoes[random][currentRotation];
// bool to let you know you can hard drop the tetromino
let dropBool = true;
// array of all divs inside the next piece board
let nextPieceDisplay = Array.from(document.querySelectorAll('#nextPiece div'));
// display score
let scoreDisplay = document.querySelector('#score');
// keep track of score
let score = 0;
// colors of the 7 tetrominoes
let colors = ['orange', 'red', 'blue', 'green', 'purple', 'yellow', 'violet']
// multiplier for clearing multiple lines at once(defualt is 0)
let multiplier = 0;
// score to add keeps track of how many lines are cleared so we can multiply be the right number
let scoreToAdd = 10;

//draws current tetromino
let draw = () => {
    //goes through current tetromino adding tetromino class, uses current position to draw it. adds color.
    currentTetromino.forEach(i => {
        boardSquares[currentPosition + i].classList.add('tetromino');
        boardSquares[currentPosition + i].style.backgroundColor = colors[random];
    }); 
}

//undraws current tetromino
let unDraw = () => {
    //goes through current tetromino removing tetromino class, uses current position to undraw it. removes color.
    currentTetromino.forEach(i => {
        boardSquares[currentPosition + i].classList.remove('tetromino');
        boardSquares[currentPosition + i].style.backgroundColor = '';
    });
}

//freezes tetromino in place if it comes in contact with a block that has the stop class.
let freeze = () => {
    //if some of the current tetromino blocks border a div below them with the stop class. freeze the current tetromino in place
    if(currentTetromino.some(i => boardSquares[currentPosition + i + width].classList.contains('stop'))){
        // sets drop bool to false so the piece will stop dropping
        dropBool = false;
        //give the current tetromino pieces the stop class
        currentTetromino.forEach(i => boardSquares[currentPosition + i].classList.add('stop'));
        // start new fall, get next tetromino and reset globals
        //gets next random piece from the next piece display
        random = nextRandom;
        // generates next random piece for next piece display
        nextRandom = Math.floor(Math.random() * tetrominoes.length);
        //sets current rotation to 0, the starting rotation
        currentRotation = 0;
        // sets current tetromino
        currentTetromino = tetrominoes[random][currentRotation];
        // sets current position to starting position of 4.
        currentPosition = 4;
        // call to display next tetromino in next piece display
        displayNextPiece();
        // updates score
        addScore();
        // resets multiplier
        multiplier = 0;
        // resets score to add
        scoreToAdd = 0;
        // updates level
        levels();
        // checks if game is over
        gameOver();
        // draws next tetromino
        draw();
    }
}

//display next tetromino
let displayNextPiece = () => {
    //removes old tetromino
    nextPieceDisplay.forEach(i => {
        i.classList.remove('tetromino');
        i.style.backgroundColor = '';
    });
    //draws new/next tetromino
    nextPieceTetrominoes[nextRandom].forEach(i => {
        nextPieceDisplay[nextPiecePosition + i].classList.add('tetromino');
        nextPieceDisplay[nextPiecePosition + i].style.backgroundColor = colors[nextRandom];
    });
}

//updates score and removes blocks if applicable 
let addScore = () => {
    //loop through whole board and check if a row is filled if so delete row and append divs to top of board
    for(let i = 0; i < 200; i += width){
        //grabs a row of divs
        let row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
        //checks if every block in that row has the stop class
        if(row.every(i => boardSquares[i].classList.contains('stop'))){
            //increment multiplier by 1 for each row removed
            multiplier++;
            //each row is worth 10 points
            scoreToAdd+= 10;
            //removes stop, tetromino classes, and colors
            row.forEach(i => {
                boardSquares[i].classList.remove('stop');
                boardSquares[i].classList.remove('tetromino');
                boardSquares[i].style.backgroundColor = '';
            });
            //splices/removes the row from boardSquares(game board)
            let squaresRemoved = boardSquares.splice(i, width);
            //mergres boardsquares to the end of squaresremoved and sets boardSquares equal to that.
            boardSquares = squaresRemoved.concat(boardSquares);
            //appends removed divs back onto the board at the beginning of the game board
            boardSquares.forEach(i => board.appendChild(i));
        }
    }
    // add/update score, score equals how many rows removed(10 points for each row) multiplied by how many rows removed(+1 for each row) ex 3 rows removed is 30 x 3, add 90 to score.
    score += (scoreToAdd * multiplier);
    // update display score
    scoreDisplay.innerText = score;
}

//checks if starting position has a block with the stop class in it, if so suspends the interval and stops the game. 
let gameOver = () => {
    if(currentTetromino.some(i => boardSquares[currentPosition + i].classList.contains('stop'))){
        scoreDisplay.innerText = 'Game Over, Your final score is ' + score;
        // suspending interval
        clearInterval(timerId);
        timerId = null;
        // game is over 
        isGameOver = true;
    }
}

//moves the tetromino left
let moveLeft = () => {
    // undraw current tetromino
    unDraw();
    //check each position of tetromino if some mod 10 === 0, dont move.
    //works becuase each left border is a multiple of ten and no other positions on the boards are. 
    if(!currentTetromino.some(i => (currentPosition + i) % width === 0)){
        currentPosition -= 1;
    }
    //check when moving left if current tetromino hits a block with the stop class if so minus currentPosition, gives effect that you cant move over. 
    if(currentTetromino.some(i => boardSquares[currentPosition + i].classList.contains('stop'))) {
        currentPosition += 1;
    }
    // draw current tetromino
    draw();
}

//moves the tetromino right
let moveRight = () => {
    // undraw current tetromino
    unDraw();
    //check each position of tetromino if some mod 10 === 9, dont move.
    //works becuase each right border always has a remainder of 9 and no other positions on the board does. 
    if(!currentTetromino.some(i => (currentPosition + i) % width === width - 1)){
        currentPosition += 1;
    }
    //check when moving right if current tetromino hits a block with the stop class if so minous currentPosition, gives effect that you cant move over. 
    if(currentTetromino.some(i => boardSquares[currentPosition + i].classList.contains('stop'))){
        currentPosition -= 1;
    }
    // draw current tetromino
    draw();
}

//moves the current tetromino down
let moveDown = () => {
    // undraw current tetromino
    unDraw()
    // current position gets plused a row (10divs). 
    currentPosition += width;
    // draw current tetromino
    draw();
    // check block under tetromino to see if current tetromino should freeze
    freeze();
}

//rotates the current tetromino
let rotate = () => {
    // undraw current tetromino
    unDraw();
    // update rotation
    currentRotation++;
    // check if rotation has passed 3, if so set it to 0
    if(currentRotation === currentTetromino.length){
        currentRotation = 0;
    }
    // set current tetromino
    currentTetromino = tetrominoes[random][currentRotation];
    // draw current tetromino
    draw();
}

//drops the current tetromino down
let drop = () => {
    // call move down as long as drop bool is false, if true stop
    while(dropBool){
        moveDown();
    }
    dropBool = true;
}

//key control event listener
document.addEventListener('keydown', (e) => {
    // prevents auto focusing of buttons
    e.preventDefault();
    // checks if game is over, disable buttons if so
    if(isGameOver){
    // checks if game is paused, disable buttons if so
    }else if(isPuased){
    // check if game has been started, disable buttons if not started yet
    }else if(!neverPlaying){
    }else{
        if(e.key === 'ArrowLeft'){
            // focus game board
            board.focus();
            // move tetromino left
            moveLeft();
        }else if(e.key === 'ArrowUp'){
            // focus game board
            board.focus();
            // rotate tetromino
            rotate();
        }else if(e.key === 'ArrowRight'){
            // focus game board
            board.focus();
            // move tetromino right
            moveRight();
        }else if(e.key === 'ArrowDown'){
            // focus game board
            board.focus();
            // move tetromino down
            moveDown();
        }else if(e.code === 'Space'){
            // focus game board
            board.focus();
            // hard drop the tetromino 
            drop();
        }
    }
});

//globals for puase/restart and play buttons
// play button
let playButton = document.querySelector('#playButton');
// keeps track of current interval
let timerId = null;
// controls how fast tetrominos fall, default 1000ms
let time = 1000;
// level display
let level = document.querySelector('#level');

// start the game when clicked
playButton.addEventListener('click', () => {
    //check if game is currently in progress if so do nothing
    if(!isPlaying){
        // draw current tetromino
        draw();
        // set timerId to interval
        timerId = setInterval(moveDown, time);
        // sets next random for next piece display
        nextRandom = Math.floor(Math.random() * tetrominoes.length);
        // display next piece
        displayNextPiece();
        isPlaying = true;
        neverPlaying = true;
    }
});

let puaseButton = document.querySelector('#puase');
//puases or unpauses game when clicked

puaseButton.addEventListener('click', () => {
    //check if game is currently in progress or if game is over
    if(isPlaying && !isGameOver){
        //sets isPuased variable
        if(!isPuased){
            isPuased = true;
        }else{
            isPuased = false;
        }
        // puase game 
        if(timerId){
            clearInterval(timerId);
            timerId = null;
        // unpuase game
        }else {
            timerId = setInterval(moveDown, time);
        }
    }
});

//determines how fast the blocks will fall based off of score
let levels = () => {
    if(score >= 400 && score < 800){
        resetInterval(900, '2');
    }else if (score >= 800 && score < 1200){
        resetInterval(800, '3');
    }else if (score >= 1200 && score < 1600){
        resetInterval(700, '4');
    }else if (score >= 1600 && score < 2000){
        resetInterval(600, '5');
    }else if (score >= 2000 && score < 2400){
        resetInterval(500, '6');
    }else if (score >= 2400 && score < 2800){
        resetInterval(400, '7');
    }else if (score >= 2800 && score < 3200){
        resetInterval(300, '8');
    }else if (score >= 3200 && score < 3600){
        resetInterval(200, '9');
    }else if (score >= 3600 && score < 4000){
        resetInterval(100, '10');
    }else if (score >= 4000 && score < 4400){
        resetInterval(50, '11');
    }else if (score >= 4800){
        resetInterval(20, '12');
    }
}

let restart = document.querySelector('#restart');

//restarts the game
restart.addEventListener('click', () => {
    //checks if game is over, if not then no nothing.
    if(isGameOver){
        //reseting globals and board.
        score = 0;
        scoreDisplay.innerText = 0;
        currentPosition = 4;
        currentRotation = 0;
        isGameOver = false;
        isPuased = false;
        for(let i = 0; i < 200; i += width){
            //grabs a row of divs
            let row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
            //removes everything
            row.forEach(i => {
                boardSquares[i].classList.remove('stop');
                boardSquares[i].classList.remove('tetromino');
                boardSquares[i].style.backgroundColor = '';
            });
        }
        resetInterval(1000, '1');
        // sets next random for next piece display
        nextRandom = Math.floor(Math.random() * tetrominoes.length);
        // display next piece
        displayNextPiece();
    }
});

// sets Interval the dynamic time and level
let resetInterval = (newTime, newLevel) => {
        // change global time
        time = newTime;
        // chnange level display
        level.innerText = newLevel;
        // clear interval and start new interval
        clearInterval(timerId);
        timerId = null;
        timerId = setInterval(moveDown, time);
}