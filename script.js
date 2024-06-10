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
let destructor1Pos1;
let destructor1Pos2;
let destructor2Pos1;
let destructor2Pos2;
let destructor3Pos1;
let destructor3Pos2;
let crucero1;
let crucero2;
let acorazado;
let emptySquares;

const drawBoat = () => {
    submarino1.forEach( square => drawSquare(square, 'shipSquare'));
    submarino2.forEach( square => drawSquare(square, 'shipSquare'));
    submarino3.forEach( square => drawSquare(square, 'shipSquare'));
    submarino4.forEach( square => drawSquare(square, 'shipSquare'));
    destructor1Pos1.forEach( square => drawSquare(square, 'shipSquare'));
    destructor1Pos2.forEach( square => drawSquare(square, 'shipSquare'));
   

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
    /* 
    Como cambiar el boton a tocado EL ID ES b+NumeroArray1+NumeroArray2
    const botonbarco1 = document.getElementById("b"+randomEmptySquare);
    botonbarco1.setAttribute('class', 'BotonBarco'); */
    const randomEmptySquare2 = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    submarino2=[randomEmptySquare2];
    drawSquare(randomEmptySquare2, 'shipSquare');
    const randomEmptySquare3 = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    submarino3=[randomEmptySquare3];
    drawSquare(randomEmptySquare3, 'shipSquare');
    const randomEmptySquare4 = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    submarino4=[randomEmptySquare4];
    drawSquare(randomEmptySquare4, 'shipSquare');
    console.log("Submarino 1: "+submarino1);
    console.log("Submarino 2: "+submarino2);
    console.log("Submarino 3: "+submarino3);
    console.log("Submarino 4: "+submarino4);
}
const createRandomDestructores = () => {
    for (let i = 0; i < 3; i++) {
        let banderaSeCreDestructor=false;
        
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    while(banderaSeCreDestructor==false){
    const [row, column] = randomEmptySquare.split('');
    const adjacentRow = row;
    const adjacentColumn = String.fromCharCode(column.charCodeAt(0) + 1);
    const adjacentSquare = adjacentRow + adjacentColumn;

    const elementAdjacentSquare = document.getElementById(adjacentSquare);

    if (elementAdjacentSquare && elementAdjacentSquare.classList.contains('emptySquare')) {

        switch(i){
            case 0 :
                destructor1Pos1 = [randomEmptySquare];
                destructor1Pos2 = [adjacentSquare];
             break;

            case 1:
                destructor2Pos1 = [randomEmptySquare];
                destructor2Pos2 = [adjacentSquare];
            break;

            case 2:
                destructor3Pos1 = [randomEmptySquare];
                destructor3Pos2 = [adjacentSquare];
            break;
        }
        

        console.log("Random empty "+ i+" : " + randomEmptySquare);
        console.log("Adjacent: " + adjacentSquare);
        

        drawSquare(randomEmptySquare, 'shipSquare');
        drawSquare(adjacentSquare, 'shipSquare');
        banderaSeCreDestructor=true;
        console.log("Se creo destructor"+i);
    } 
}
}
}

const setBarcos =()=>{
    
    createRandomSubmarinos();
    createRandomDestructores();
   
}
const createBoard = () => {
    boardSquares.forEach( (row, rowIndex) => {
        row.forEach( (column, columnndex) => {
            const squareValue = `${rowIndex}${columnndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            const botonAgua= document.createElement('button');
            botonAgua.setAttribute('class','BotonAgua');
            botonAgua.type= 'button';
            let valorIdBoton="";
            valorIdBoton="b"+squareValue;
            botonAgua.setAttribute('id',valorIdBoton);
            board.appendChild(squareElement);
            squareElement.appendChild(botonAgua);
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
const validarSiEsBarco=(PosicionBoton)=>{
    /*NO SE PQ ACA NO NECESITA LA B ANTES Q LA POSICION PERO FUNCIONA :D */
    let Posicion = PosicionBoton.substring(1)
    if(Posicion==submarino1[0]||Posicion==submarino2[0]||Posicion==submarino3[0]||Posicion==submarino4[0]
       ||Posicion==destructor1Pos1[0]||Posicion==destructor1Pos2[0] 
       ||Posicion==destructor2Pos1[0]||Posicion==destructor2Pos2[0]
       ||Posicion==destructor3Pos1[0]||Posicion==destructor3Pos2[0] 
    ){
        return true;
    }else{return false;}


}
const getBotones=()=>{
   

   
    const botonesAgua = document.querySelectorAll('.BotonAgua');


    botonesAgua.forEach(boton => {
    if(validarSiEsBarco(boton.id)){ boton.addEventListener('click',() => CambiarATocado(boton))}else{
    boton.addEventListener('click', () => { boton.setAttribute('class', 'BotonAguaTocado');});}
    
    
});
}
const startGame = ()=>{
    
    setGame();
    gameOverSign.style.display = 'none';
    //startButton.disabled = true;
    drawBoat();
    getBotones();
   
}
const CambiarATocado=(boton)=>
{
    console.log("Entro a tocado");
    
    boton.setAttribute('class', 'BotonBarco');

}

startButton.addEventListener('click', startGame);



