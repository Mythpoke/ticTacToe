function startGame() {
    let player1, player2;
    player1 = player(prompt("name?"));
    player2 = player(prompt("name?"));
    
    player1 = player(player1.name, prompt("mark?"));
    player2 = player(player2.name, prompt("mark?"));

    Dom.DomObj.currentMark = player1.mark;

    do {
    player1 = player(player1.name, player1.mark, Dom.DomObj.index);
    player2 = player(player2.name, player2.mark, Dom.DomObj.index);

        
} while(checkWinner(getRound(player1.mark, player2.mark)))
    }

function toggleMark(player, mark) {
    return player === mark ? mark: player;
}
// IIFE
const gameboard = (function () {
    const obj = {
        board: ['', '', '',
               '', '', '',
               '', '', ''],
    }
    return {
        obj,
    }
})();
// IIFE
const Dom = (function() {     
    const DomObj = {
        grid: document.getElementById('grid'),
        turn: document.getElementById('turn'),
        result: document.getElementById('result'),
        startBtn: document.getElementById('startBtn'),
        restartBtn: document.getElementById('restartBtn'),
        currentMark: "X",
        index: 0,
    }                      //Handle display & DOM logic
    
    for(let i = 0; 9 > i; i++) {

        
        const square = document.createElement('div');
        square.className = 'square';
        square.setAttribute("data-index", i);
        square.style.fontSize = 120 + "px";
        square.style.height = 400 / 3 + "px";
        square.style.width = 400 / 3 + "px";
        DomObj.grid.appendChild(square);
        square.addEventListener('click', ()=> {
    
         DomObj.index = square.getAttribute("data-index");
           if(DomObj.currentMark === "X") {
                square.textContent = "X";
                DomObj.currentMark = "O";
                gameboard.obj.board.splice(DomObj.index, 1, "X");
           }
           else {
                square.textContent = "O";
                DomObj.currentMark = "X";
                gameboard.obj.board.splice(DomObj.index, 1, "O");
           }
           

        }, {once: true})
        
    }
    startBtn.addEventListener('click', ()=> {
        startGame();
    })
    return {DomObj};
})();



// Factory function
const player = function (name, mark) {

   return {name, mark};
    
}
//Factory function
const combination = function () {
    
    return {HorizontalMark: 0, VerticalMarkColumn1: 0, VerticalMarkColumn2: 0, VerticalMarkColumn3: 0, DiagonalMark: 0, AntiDiagonalMark: 0};
}
// Other functions
function checkWinner(Result) {
    if(Result === 1) {
        console.log("Player 1 won");
    }
    else if(Result === -1) {
        console.log("Player 2 won");
    }
}

function getRound(player1Mark, player2Mark) {

   let player1 = combination();
   let player2 = combination();

    for(let i = 0; gameboard.obj.board.length > i; i++) {


        if(player1Mark === gameboard.obj.board[i]) {           /// Checks horizontal condition
            player1.HorizontalMark++;
        }
        else if(player2Mark === gameboard.obj.board[i]) {
            player2.HorizontalMark++;
        }

        

        if(i % 3 === 0) {         //Checks vertical condition 
            if(player1Mark === gameboard.obj.board[i]) {
                player1.VerticalMarkColumn1++;
                
            }
            else if(player2Mark === gameboard.obj.board[i]) {
                player2.VerticalMarkColumn1++;
                
            }
        }
        else if(i % 3 === 1) {         //Checks vertical condition 
            if(player1Mark === gameboard.obj.board[i]) {
                player1.VerticalMarkColumn2++;
                
            }
            else if(player2Mark === gameboard.obj.board[i]) {
                player2.VerticalMarkColumn2++;
                
            }
        }
        else if(i % 3 === 2) {         //Checks vertical condition 
            if(player1Mark === gameboard.obj.board[i]) {
                player1.VerticalMarkColumn3++;
                
            }
            else if(player2Mark === gameboard.obj.board[i]) {
                player2.VerticalMarkColumn3++;
                
            }
        }

        if(i === 0 || i === 4 || i === 8) {             //Checks diagonal condition
            if(player1Mark === gameboard.obj.board[i]) {
                player1.MarkDiagonal++;
            }
            else if(player2Mark === gameboard.obj.board[i]) {
                player2.MarkDiagonal++;
            }
        }

        if(i === 2 || i === 4 || i === 6) {             //Chceks antiDiagonal condition
            if(player1Mark === gameboard.obj.board[i]) {
                player1.AntiDiagonalMark++;
            }
            else if(player2Mark === gameboard.obj.board[i]) {
                player2.AntiDiagonalMark++;
            }
        }
        
        if(player1.HorizontalMark === 3 || player1.VerticalMarkColumn1 === 3 ||
            player1.VerticalMarkColumn2 === 3 || player1.VerticalMarkColumn3 === 3 ||
            player1.MarkDiagonal === 3 || player1.AntiDiagonalMark === 3 ) return 1;
            
        else if(player2.HorizontalMark === 3 || player2.VerticalMarkColumn1 === 3 ||
            player2.VerticalMarkColumn2 === 3 || player2.VerticalMarkColumn3 === 3 ||
            player2.MarkDiagonal === 3 || player2.AntiDiagonalMark === 3) return -1; 

        else if(i === 8) return 0;

        if(i === 2 || i === 5) {
            player1.HorizontalMark = 0;
            player2.HorizontalMark = 0;
        }
        
    }

}

