
function game() {

    let player1, player2;

    do {

        player1 = player(prompt("Choose a name for player one"));
        player2 = player(prompt("Choose a name for player two"));
    
    } while(
        player1.name === "" || player2.name === ""
    ); 

    do {
        player1 = player(player1.name, prompt(player1.name + " Choose a mark '0' or 'X'."));
        player2 = player(player2.name, prompt(player2.name + " Choose a mark '0' or 'X'."));

    } while(
        (player1.mark !== "X" && player1.mark !== "O") ||
        (player2.mark !== "X" && player2.mark !== "O") ||
        player1.mark === player2.mark
    );

    for(let i = 0; gameboard.board.game.length > i; i++) {


    do {

        player1 = player(player1.name, player1.mark, +prompt(player1.name + " Choose a square from 1 to 9"));
        player2 = player(player2.name, player2.mark, +prompt(player2.name + " Choose a square from 1 to 9"));

    } while(
        isNaN(player1.square) || isNaN(player2.square) ||
        !(player1.square >= 1 && player1.square <= 9) ||
        !(player2.square >= 1 && player2.square <= 9) ||
        player1.square === player2.square
    );

    player1.makeMove();
    player2.makeMove();
   if(getWinner(player1.mark, player2.mark) === 1) player1Result++;
   else if(getWinner(player1.mark, player2.mark) === -1) player2Result++;
   else if(getWinner(player1.mark, player2.mark) === 0) return 0;

   if(player1Result === 3) break;
   else if(player2Result === 3) break;
   }
}


const gameboard = (function () {
    const board = {
        game: ['', '', '',
               '', '', '',
               '', '', ''],
    }
    const player = function (name, mark, square) {
        const result = [];
        const makeMove = () =>
       gameboard.board.game.splice(square - 1, 1, mark);
       return {name, mark, square, makeMove};
        
}

    return {
        board,
        player,
    }
})()

const DOM = (function() {                           //Handle display & DOM logic
    const grid = document.getElementById('grid');
    for(let i = 0; 9 > i; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.height = 400 / 3 + "px";
        square.style.width = 400 / 3 + "px";
        grid.appendChild(square);
    }

})()



function getWinner(player1Mark, player2Mark) {

    const variables = {
        player1MarkHorizontal: 0,
        player2MarkHorizontal: 0,

        player1MarkVerticalColumn1: 0,
        player2MarkVerticalColumn1: 0,
        player1MarkVerticalColumn2: 0,
        player2MarkVerticalColumn2: 0,
        player1MarkVerticalColumn3: 0,
        player2MarkVerticalColumn3: 0,

        player1MarkDiagonal: 0,
        player2MarkDiagonal: 0,

        player1MarkAntiDiagonal: 0,
        player2MarkAntiDiagonal: 0,

        draw: 0,

    }

    for(let i = 0; gameboard.board.game.length > i; i++) {

        draw++;

        if(player1Mark === gameboard.board.game[i]) {           /// Checks horizontal condition
            variables.player1MarkHorizontal++;
        }
        else if(player2Mark === gameboard.board.game[i]) {
            variables.player2MarkHorizontal++;
        }

        

        if(i % 3 === 0) {         //Checks vertical condition 
            if(player1Mark === gameboard.board.game[i]) {
                variables.player1MarkVerticalColumn1++;
                
            }
            else if(player2Mark === gameboard.board.game[i]) {
                variables.player2MarkVerticalColumn1++;
                
            }
        }
        else if(i % 3 === 1) {         //Checks vertical condition 
            if(player1Mark === gameboard.board.game[i]) {
                variables.player1MarkVerticalColumn2++;
                
            }
            else if(player2Mark === gameboard.board.game[i]) {
                variables.player2MarkVerticalColumn2++;
                
            }
        }
        else if(i % 3 === 2) {         //Checks vertical condition 
            if(player1Mark === gameboard.board.game[i]) {
                variables.player1MarkVerticalColumn3++;
                
            }
            else if(player2Mark === gameboard.board.game[i]) {
                variables.player2MarkVerticalColumn3++;
                
            }
        }

        
        

        if(i === 0 || i === 4 || i === 8) {             //Checks diagonal condition
            if(player1Mark === gameboard.board.game[i]) {
                variables.player1MarkDiagonal++;
            }
            else if(player2Mark === gameboard.board.game[i]) {
                variables.player2MarkDiagonal++;
            }
        }

        if(i === 2 || i === 4 || i === 6) {             //Chceks antiDiagonal condition
            if(player1Mark === gameboard.board.game[i]) {
                variables.player1MarkAntiDiagonal++;
            }
            else if(player2Mark === gameboard.board.game[i]) {
                variables.player2MarkAntiDiagonal++;
            }
        }
        
        if(variables.player1MarkHorizontal === 3 || variables.player1MarkVertical === 3 ||
           variables.player1MarkDiagonal === 3 || variables.player1MarkAntiDiagonal === 3 ) return 1;
        else if(variables.player2MarkHorizontal === 3 || variables.player2MarkVertical === 3 ||
                variables.player2MarkDiagonal === 3 || variables.player2MarkAntiDiagonal === 3) return -1; 
        else if(variables.draw === 9) return 0;

        if(i === 2 || i === 5 || i === 8) {
            variables.player2MarkHorizontal = 0;
            variables.player1MarkHorizontal = 0;
        }
        
    }



}

game();