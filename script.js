//hetml elements
const startButton = document.getElementById('start');
const board = document.getElementById('TableroPrincipal');
const gameOverSign = document.getElementById('gameOver');

///game settings
const boardSize = 10;

const squareTypes = {
    emptySquare: 0,
    shipSquare: 1
};
///variables del juego
let boardSquares;
let submarino1;
let submarino2;
let submarino3;
let submarino4;
let destructores;
let cruceros;
let acorazado;
let emptySquares;

const drawBoat = () => {
    submarino1.forEach( square => drawSquare(square, 'shipSquare'));
    submarino2.forEach( square => drawSquare(square, 'shipSquare'));
    submarino3.forEach( square => drawSquare(square, 'shipSquare'));
    submarino4.forEach( square => drawSquare(square, 'shipSquare'));
}


const drawSquare = (square, type) => {
    const [ row, column ] = square.split('');
    boardSquares[row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    if(type === 'emptySquare') {
        emptySquares.push(square);
    } else {
        if(emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
}




const createRandomSubmarinos=()=>{
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    submarino1=[randomEmptySquare];
    
    drawSquare(randomEmptySquare, 'shipSquare');

    const randomEmptySquare2 = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    submarino2=[randomEmptySquare2];
    
    drawSquare(randomEmptySquare2, 'shipSquare');

    const randomEmptySquare3 = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    submarino3=[randomEmptySquare3];
    
    drawSquare(randomEmptySquare3, 'shipSquare');

    const randomEmptySquare4 = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    submarino4=[randomEmptySquare4];
    
    drawSquare(randomEmptySquare4, 'shipSquare');
}

const setBarcos =()=>{
    
    createRandomSubmarinos();
   
}
const createBoard = () => {
    boardSquares.forEach( (row, rowIndex) => {
        row.forEach( (column, columnndex) => {
            const squareValue = `${rowIndex}${columnndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        })
    })
}
const setGame = () => {
    
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
   
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
    setBarcos();
}
const startGame = ()=>{
    
    setGame();
    gameOverSign.style.display = 'none';
    //startButton.disabled = true;
    drawBoat();
   
}

startButton.addEventListener('click', startGame);