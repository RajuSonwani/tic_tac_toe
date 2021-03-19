const x_class = "x";
const o_class = "o";
const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let o_turn;
const cellElement = document.querySelectorAll("[data-cell]");
const boardClass = document.getElementById("board");
const winningMsgElem = document.getElementById("winning-message");
const winningMsgTextElem = document.querySelector("[data-winning-message-text]");
const restart = document.getElementById("restartBtn");
restart.addEventListener("click",startGame)

startGame();

function startGame(){
    o_turn = false;
    setBoardHoverClass();
    cellElement.forEach((cell)=>{
        cell.classList.remove(o_class);
        cell.classList.remove(x_class);
        cell.removeEventListener("click",handleClick);
        cell.addEventListener("click",handleClick,{once:true})
    });
    winningMsgElem.classList.remove("show");
}

function handleClick(e){
    const cell = e.target;
    const current_class = o_turn? o_class : x_class;
    placeMark(cell,current_class)
    //Check for Win
    if(checkWin(current_class)){
        endGame(false)
    //Check for Draw
    }else if(isDraw()){
        endGame(true)
    }else{
    //Switch Turns
    swapTurn()
    setBoardHoverClass();
    }
}

function endGame(draw){
    if(draw){
        winningMsgTextElem.innerText = "Draw.!"
    }else{
        winningMsgTextElem.innerText = `${o_turn? "O's": "X's"} Wins.!`
    }
    winningMsgElem.classList.add("show")

}

function isDraw(){
    return [...cellElement].every(cell=>{
        return cell.classList.contains(x_class)||cell.classList.contains(o_class)
    })
}

function placeMark(cell,current_class){
    cell.classList.add(current_class)
}

function swapTurn(){
    o_turn = !o_turn
}

function setBoardHoverClass(){
    boardClass.classList.remove(x_class);
    boardClass.classList.remove(o_class);
    if(o_turn){
        boardClass.classList.add(o_class)
    }else{
        boardClass.classList.add(x_class)
    }
}

function checkWin(current_class){
    // console.log(winningCombination);
    return winningCombination.some(combination=>{
        // console.log(combination)
        return combination.every(index=>{
            // console.log(index)
            // console.log(cellElement[index]);
            return cellElement[index].classList.contains(current_class)
        })
    })

}