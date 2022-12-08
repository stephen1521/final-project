//creating boards
//globals for creating boards
let board = document.querySelector('#board');
let nextPiece = document.querySelector('#nextPiece');
//creates main board
let createBoard = () => {
    for(let i = 0; i < 200; i++){
        let boardDiv = document.createElement('div');
        boardDiv.classList.add('boardDiv');
        board.appendChild(boardDiv);
    }
    for(let i = 0; i < 10; i++){
        let stopDiv = document.createElement('div');
        stopDiv.classList.add('stop');
        board.appendChild(stopDiv);
    }
}
//creates next piece board
let createNextPieceBoard = () => {
    for(let i = 0; i < 16; i++){
        let boardDiv = document.createElement('div');
        boardDiv.classList.add('boardDiv');
        nextPiece.appendChild(boardDiv);
    }
}
createBoard();
createNextPieceBoard();

//globals for game
let width = 10;
let currentPosition = 4;
let currentRotation = 0;
let nextPieceDisplayWidth = 4;
let nextPiecePosition = 0;
let nextRandom = 0;
let isPlaying = false;
let isGameOver = false;
let isPuased = false;
let neverPlaying = false;
// all 7 tetrominoes and their rotations
let lTetromino = [
    [1, width+1, width*2+1, width*2+2],
    [width, width+1, width+2, width*2],
    [0, 1, width+1, width*2+1],
    [width, width+1, width+2, 2]
];
let jTetromino = [
    [1, width+1, width*2+1, width*2],
    [0, width, width+1, width+2],
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2]
]
let sTetromino = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
];
let zTetromino = [
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2],
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2]
]
let tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
];
let oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
];
let iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
];
// tetrominoes for next piece display
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
let tetrominoes = [lTetromino, jTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
let boardSquares = Array.from(document.querySelectorAll('#board div'));
let random = Math.floor(Math.random() * tetrominoes.length);
let currentTetromino = tetrominoes[random][currentRotation];
let dropBool = true;
let nextPieceDisplay = Array.from(document.querySelectorAll('#nextPiece div'));
let scoreDisplay = document.querySelector('#score');
let score = 0;
let colors = ['orange', 'red', 'blue', 'green', 'purple', 'yellow', 'violet']
//draws current tetromino
let draw = () => {
    //goes through current tetromino adding tetromino class, uses current position to draw it. adds color
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
        dropBool = false;
        //give the current tetromino pieces the stop class
        currentTetromino.forEach(i => boardSquares[currentPosition + i].classList.add('stop'));
        // start new fall, get next tetromino and reset globals
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * tetrominoes.length);
        currentRotation = 0;
        currentTetromino = tetrominoes[random][currentRotation];
        currentPosition = 4;
        displayNextPiece();
        addScore();
        levels();
        gameOver();
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
    for(let i = 0; i < 200; i += width){
        //grabs a row of divs
        let row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
        //checks if every block in that row has the stop class
        if(row.every(i => boardSquares[i].classList.contains('stop'))){
            score += 10;
            scoreDisplay.innerText = score;
            //removes stop and tetromino classes
            row.forEach(i => {
                boardSquares[i].classList.remove('stop');
                boardSquares[i].classList.remove('tetromino');
                boardSquares[i].style.backgroundColor = '';
            });
            //splices/removes the row from boardSquares
            let squaresRemoved = boardSquares.splice(i, width);
            //mergres sqauresRemoved and boardSquares and sets boardSquares equal to that.
            boardSquares = squaresRemoved.concat(boardSquares);
            //appends removeed divs back onto the board
            boardSquares.forEach(i => board.appendChild(i));
        }
    }
}
//checks if starting position has a block with the stop class in it, suspends the interval and stops the game. 
let gameOver = () => {
    if(currentTetromino.some(i => boardSquares[currentPosition + i].classList.contains('stop'))){
        scoreDisplay.innerText = 'Game Over, Your final score is ' + score;
        clearInterval(timerId);
        timerId = null;
        isGameOver = true;
    }
}
//moves the tetromino left
let moveLeft = () => {
    unDraw();
    //check each position of tetromino if some mod 10 === 0, dont move.
    //works becuase each left border is a multiple of ten and no other positions on the board are. 
    if(!currentTetromino.some(i => (currentPosition + i) % width === 0)){
        currentPosition -= 1;
    }
    //check when moving left if current tetromino hits a block with the stop class if so minus currentPosition, gives effect that you cant move over. 
    if(currentTetromino.some(i => boardSquares[currentPosition + i].classList.contains('stop'))) {
        currentPosition += 1;
    }
    draw();
}
//moves the tetromino right
let moveRight = () => {
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
    draw();
}
//moves the current tetromino down
let moveDown = () => {
    unDraw()
    currentPosition += width;
    draw();
    freeze();
}
//rotates the current tetromino
let rotate = () => {
    unDraw();
    currentRotation++;
    if(currentRotation === currentTetromino.length){
        currentRotation = 0;
    }
    currentTetromino = tetrominoes[random][currentRotation];
    draw();
}
//drops the current tetromino down
let drop = () => {
    while(dropBool){
        moveDown();
    }
    dropBool = true;
}
//key control event listener
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if(isGameOver){
    }else if(isPuased){
    }else if(!neverPlaying){
    }else{
        if(e.key === 'ArrowLeft'){
            board.focus();
            moveLeft();
        }else if(e.key === 'ArrowUp'){
            board.focus();
            rotate();
        }else if(e.key === 'ArrowRight'){
            board.focus();
            moveRight();
        }else if(e.key === 'ArrowDown'){
            board.focus();
            moveDown();
        }else if(e.code === 'Space'){
            board.focus();
            drop();
        }
    }
});

//globals for puase/restart and play buttons
let playButton = document.querySelector('#playButton');
let timerId = null;
let time = 1000;
let level = document.querySelector('#level');
// start the game when clicked
playButton.addEventListener('click', () => {
    //check if game is currently in progress if so do nothing
    if(!isPlaying){
        draw();
        timerId = setInterval(moveDown, time);
        nextRandom = Math.floor(Math.random() * tetrominoes.length);
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
        if(timerId){
            clearInterval(timerId);
            timerId = null;
        }else {
            timerId = setInterval(moveDown, time);
        }
    }
});
//determines how fast the blocks will fall based off of score
let levels = () => {
    if(score >= 200 && score < 400){
        resetInterval(900, '2');
    }else if (score >= 400 && score < 600){
        resetInterval(800, '3');
    }else if (score >= 600 && score < 800){
        resetInterval(700, '4');
    }else if (score >= 800 && score < 1000){
        resetInterval(600, '5');
    }else if (score >= 1000 && score < 1200){
        resetInterval(500, '6');
    }else if (score >= 1200 && score < 1400){
        resetInterval(400, '7');
    }else if (score >= 1400 && score < 1600){
        resetInterval(300, '8');
    }else if (score >= 1600 && score < 1800){
        resetInterval(200, '9');
    }else if (score >= 1800 && score < 2000){
        resetInterval(100, '10');
    }else if (score >= 2000 && score < 2500){
        resetInterval(50, '11');
    }else if (score >= 2500){
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
        nextRandom = Math.floor(Math.random() * tetrominoes.length);
        displayNextPiece();
    }
});

let resetInterval = (newTime, newLevel) => {
        time = newTime;
        level.innerText = newLevel;
        clearInterval(timerId);
        timerId = null;
        timerId = setInterval(moveDown, time);
}