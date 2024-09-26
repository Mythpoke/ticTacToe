

const displayController = (function () {
    let toggle = true;
    let currentIndex;   
    let currentMark;
    const turn = document.getElementById("turn"); 

    const playerOne = {
        mark: document.getElementById("markOne"),
        input: document.getElementById("playerOne"),
        wins: 0,
    }
   const playerTwo = {
        mark: document.getElementById("markTwo"),
        input: document.getElementById("playerTwo"),
        wins: 0,
    }

function drawChars(cube) {
    
    const start = document.getElementById("start");
    const result = document.getElementById("result");

    cube.addEventListener("click", ()=> {
        
        cube.disabled = true;
        if(toggle == true) {
            currentMark = playerOne.mark.value;
            turn.textContent = playerOne.input.value + "'s turn";

        }
        else {
            currentMark = playerTwo.mark.value;
            turn.textContent = playerTwo.input.value + "'s turn";
        }
        cube.textContent = currentMark;
        currentIndex = cube.getAttribute("meta-data");
        toggle = !toggle;
        console.log(toggle);
        gameBoard.updateGameBoard(currentMark, currentIndex);
        gameBoard.checkRound(playerOne.mark.value, playerTwo.mark.value);
    })
}

function makeGrid() {
    const gridContainer = document.getElementById("gridContainer");
    

    for(let i = 0; i < 9; i++) {
        let cube = document.createElement("button");
        cube.classList.add("cube");
        gridContainer.appendChild(cube);
        cube.setAttribute("meta-data", i);
    
        cube.style.width = 400 / 3 + "px";
        cube.style.height = 400 / 3 + "px";
        drawChars(cube);
    }
}
function resetGrid() {
    const cubeList = document.querySelectorAll('.cube');
    for(let i = 0; i < 9; i++) {
        cubeList[i].textContent = '';
        cubeList[i].disabled = false;
    }
    
}

function resetRound() {
    resetGrid();
    for (let i = 0; i < gameBoard.gameBoardArr.length; i++) {
        gameBoard.gameBoardArr[i] = '';
    }
    toggle = !toggle;
    
} 

function startGame() {

    const submit = document.getElementById("submit");
    const dialog = document.querySelector("dialog");
    const turn = document.getElementById("turn");

    start.addEventListener("click", ()=> {
        dialog.showModal()
    ;})
    
    submit.addEventListener("click", ()=> {
        dialog.close();
        turn.textContent = playerOne.input.value + "'s turn";
        start.disabled = true;
    ;})
    
}

    return { makeGrid, resetRound, resetGrid, drawChars, startGame, turn, playerOne, playerTwo, result, toggle };
})()


const gameBoard = (function () {
    
   const gameBoardArr = 
   ['', '', '',
    '', '', '',
    '', '', ''
   ];

   let roundCounter = 0;

   function updateGameBoard(playerChar, index) {
        gameBoardArr[index] = playerChar;
   }

   function checkWinner(winsOne, winsTwo) {
    if(winsOne == 3) {
        displayController.result.textContent = `${displayController.playerOne.input.value} has won!`;
    }
    else if(winsTwo == 3) {
        displayController.result.textContent = `${displayController.playerOne.input.value} has won!`;
    }
    else {
        displayController.result.textContent = `${displayController.playerOne.input.value} : ${displayController.playerOne.wins} ${displayController.playerTwo.input.value} : ${displayController.playerTwo.wins}`;
    }
    
   }
   function checkRound(markOne, markTwo) {
        roundCounter++;
        if(roundCounter === 9) {
            roundCounter = 0;
            displayController.resetRound();
        }
        else if(gameBoardArr[0] == markOne && gameBoardArr[1] == markOne && gameBoardArr[2] == markOne ||        //horizontal
           gameBoardArr[3] == markOne && gameBoardArr[4] == markOne && gameBoardArr[5] == markOne ||
           gameBoardArr[6] == markOne && gameBoardArr[7] == markOne && gameBoardArr[8] == markOne  
        ) {
            displayController.playerOne.wins++;
            roundCounter = 0;
            displayController.resetRound();
        }
        else if(gameBoardArr[0] == markTwo && gameBoardArr[1] == markTwo && gameBoardArr[2] == markTwo ||   //horizontal
            gameBoardArr[3] == markTwo && gameBoardArr[4] == markTwo && gameBoardArr[5] == markTwo ||
            gameBoardArr[6] == markTwo && gameBoardArr[7] == markTwo && gameBoardArr[8] == markTwo  
         ) {
            displayController.playerTwo.wins++;
            roundCounter = 0;
            displayController.resetRound();
         }
        else if(gameBoardArr[0] == markOne && gameBoardArr[3] == markOne && gameBoardArr[6] == markOne ||   //vertical
            gameBoardArr[1] == markOne && gameBoardArr[4] == markOne && gameBoardArr[7] == markOne ||
            gameBoardArr[2] == markOne && gameBoardArr[5] == markOne && gameBoardArr[8] == markOne  
         ) {
            displayController.playerOne.wins++;
            roundCounter = 0;
            displayController.resetRound();
         } 
        else if(gameBoardArr[0] == markTwo && gameBoardArr[3] == markTwo && gameBoardArr[6] == markTwo ||   //vertical
            gameBoardArr[1] == markTwo && gameBoardArr[4] == markTwo && gameBoardArr[7] == markTwo ||
            gameBoardArr[2] == markTwo && gameBoardArr[5] == markTwo && gameBoardArr[8] == markTwo  
         ) {
            displayController.playerTwo.wins;
            roundCounter = 0;
            displayController.resetRound();
         }  
        else if(gameBoardArr[0] == markOne && gameBoardArr[4] == markOne && gameBoardArr[8] == markOne ||   //diagonal
            gameBoardArr[2] == markOne && gameBoardArr[4] == markOne && gameBoardArr[6] == markOne
         ) {
            displayController.playerOne.wins++;
            roundCounter = 0;
            displayController.resetRound();
         } 
        else if(gameBoardArr[0] == markTwo && gameBoardArr[4] == markTwo && gameBoardArr[8] == markTwo ||   //diagonal
            gameBoardArr[2] == markTwo && gameBoardArr[4] == markTwo && gameBoardArr[6] == markTwo 
         ) {
            displayController.playerTwo.wins++;
            roundCounter = 0;
            displayController.resetRound();
         }   
        
         checkWinner(displayController.playerOne.wins, displayController.playerTwo.wins);
   }
  


   return {gameBoardArr, roundCounter, updateGameBoard, checkRound};
})();

displayController.startGame();
displayController.makeGrid();


