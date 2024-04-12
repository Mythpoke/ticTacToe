
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
        toggler: true,
        startToggler: false,
        player1: null,
        player2: null,
        player1Result: 0,
        player2Result: 0,
        once: true,

        player: function(name, mark) {
            return {name, mark};
        }

       
    }                     //Handle display & DOM logic
    
    for(let i = 0; 9 > i; i++) {

        
        const square = document.createElement('button');
        square.className = 'square';
        square.setAttribute("data-index", i);
        square.style.fontSize = 120 + "px";
        square.style.height = 400 / 3 + "px";
        square.style.width = 400 / 3 + "px";
        square.disabled = true;
        DomObj.grid.appendChild(square);
        square.addEventListener('click', ()=> {
    
         DomObj.index = square.getAttribute("data-index");
         square.disabled = true;
         DomObj.toggler === false ?  DomObj.turn.textContent = `${DomObj.player1.name}'s turn`: DomObj.turn.textContent = `${DomObj.player2.name}'s turn`;
         DomObj.toggler = !DomObj.toggler;  //changes value every turn

           if(DomObj.currentMark === "X") {
                square.textContent = "X";                       //display current mark
                DomObj.currentMark = "O";                       //change of the mark
                gameboard.obj.board.splice(DomObj.index, 1, "X");   // fill the gameboard array
           }
           else {
                square.textContent = "O";
                DomObj.currentMark = "X";
                gameboard.obj.board.splice(DomObj.index, 1, "O");
           }
           
           getRound(DomObj.player1.mark, DomObj.player2.mark);
           checkWinner(DomObj.player1Result, DomObj.player2Result);
        //    nextRound();

        })
        
    }
    
    startBtn.addEventListener('click', ()=> {
        
        if(DomObj.player1Result === 3 || DomObj.player2Result === 3) {
            restartGameboard();
        }
        document.querySelectorAll('.square').forEach((square) => square.disabled = false);
        DomObj.player1 = DomObj.player(prompt("Name?"), prompt("Mark?"));
        DomObj.player2 = DomObj.player(prompt("Name?"), prompt("Mark?"));

        DomObj.turn.textContent = `${DomObj.player1.name}'s turn`;

        DomObj.currentMark = DomObj.player1.mark;
        DomObj.startToggler = true;

    })
    DomObj.restartBtn.addEventListener('click', ()=> {
        restartGameboard();
    })
    
    return {DomObj};
})();

// }
//Factory function
const combination = function () {
    
    return {HorizontalMark: 0, VerticalMarkColumn1: 0, VerticalMarkColumn2: 0, VerticalMarkColumn3: 0, DiagonalMark: 0, AntiDiagonalMark: 0};
}
// Other functions
function checkWinner(player1Result, player2Result) {
    
    Dom.DomObj.result.textContent = `${Dom.DomObj.player1.name}: ${player1Result} ${Dom.DomObj.player2.name}:${player2Result}`;
    if(player1Result === 3) {
      
      Dom.DomObj.result.textContent = `Game over. ${Dom.DomObj.player1.name} has won`;
      Dom.DomObj.turn.textContent = "";
      document.querySelectorAll('.square').forEach((square) => {
        square.textContent = '';
        square.disabled = true;
       });


    }
    else if(player2Result === 3) {
        document.querySelectorAll('.square').forEach((square) => square.disabled = true);
       Dom.DomObj.result.textContent = `Game over. ${Dom.DomObj.player2.name} has won`;
       Dom.DomObj.turn.textContent = "";
      document.querySelectorAll('.square').forEach((square) => {
        square.textContent = '';
        square.disabled = true;
       });
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
            player1.MarkDiagonal === 3 || player1.AntiDiagonalMark === 3 ) {
                clearGameboard();
                Dom.DomObj.player1Result++;
                break;
            }
            
        else if(player2.HorizontalMark === 3 || player2.VerticalMarkColumn1 === 3 ||
            player2.VerticalMarkColumn2 === 3 || player2.VerticalMarkColumn3 === 3 ||
            player2.MarkDiagonal === 3 || player2.AntiDiagonalMark === 3) {
                clearGameboard();
                Dom.DomObj.player2Result++;
                console.log(Dom.DomObj.player2Result);
                break;
            } 

        else if(i === 8) return 0;

        if(i === 2 || i === 5) {
            player1.HorizontalMark = 0;
            player2.HorizontalMark = 0;
        }
        
    }

}

function nextRound() {

        if(Dom.DomObj.player1Result === 1 || Dom.DomObj.player2Result === 1) {
        document.querySelectorAll('.square').forEach((square) => square.disabled = false);

        Dom.DomObj.player1 = Dom.DomObj.player(Dom.DomObj.player1.name, Dom.DomObj.player1.mark);
        Dom.DomObj.player2 = Dom.DomObj.player(Dom.DomObj.player2.name, Dom.DomObj.player2.mark);

        Dom.DomObj.turn.textContent = `${Dom.DomObj.player1.name}'s turn`;

        Dom.DomObj.currentMark = Dom.DomObj.player1.mark;
        }
        
}

function clearGameboard() {
    gameboard.obj.board = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.square').forEach((square) => {
         square.textContent = '';
         square.disabled = false;
        });
}

function restartGameboard() {
    // Reset gameboard state
    gameboard.obj.board = ['', '', '', '', '', '', '', '', ''];

    // Reset player results
    Dom.DomObj.player1Result = 0;
    Dom.DomObj.player2Result = 0;

    // Enable all squares
    document.querySelectorAll('.square').forEach((square) => {
        square.textContent = '';
        square.disabled = true;
    });
    // Update turn indicator and current mark
    // Dom.DomObj.turn.textContent = `${Dom.DomObj.player1.name}'s turn`;
    // Dom.DomObj.currentMark = Dom.DomObj.player1.mark;

    // Clear result text
    Dom.DomObj.result.textContent = "";
    Dom.DomObj.turn.textContent = "";
}