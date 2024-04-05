let square = 1;
const gameboard = (function () {
        const board = {
            game: ['O', 'O', 'O',
                   'X', 'O', 'X',
                   'O', 'X', 'O'],
        }

        return {
            board,
        }
})()
    

    const player = function (name, mark, square) {
        const result = [];
        const makeMove = () =>
       result.push(gameboard.board.game.splice(square - 1, 1, mark));
       const checkResult = () => console.log(`result for ${name} is ` + result);
    
       return {name, square, makeMove, result, checkResult};
        
}



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
        player1.mark !== "X" || player1.mark !== "O" ||
        player2.mark !== "X" || player2.mark !== "O" ||
        player1.mark === player2.mark
    );

    do {

        player1 = player(player1.name, player1.mark, +prompt(player1.name + " Choose a square from 1 to 9"));
        player2 = player(player2.name, player1.mark, +prompt(player2.name + " Choose a square from 1 to 9"));

    } while(
        isNaN(player1.square) || isNaN(player2.square) ||
        !(player1.square >= 1 && player1.square <= 9) ||
        !(player2.square >= 1 && player2.square <= 9) ||
        player1.square === player2.square
    );

}

function getWinner(player1Mark, player2Mark) {

    let player1MarkHorizontal = [];
    let player2MarkHorizontal = [];

    let player1MarkVertical = [];
    let player2MarkVertical = [];

    let player1MarkObliquely = [];
    let player2MarkObliquely = [];

    for(let i = 0; gameboard.board.game.length > i; i++) {
        console.log(gameboard.board.game.length);
        if(player1MarkHorizontal.length === 3 || player1MarkVertical.length === 3) return "Player1 won";
        else if(player2MarkHorizontal.length === 3 || player2MarkHorizontal.length === 3) return "Player2 won";

        if(player1Mark === gameboard.board.game[i]) {
            player1MarkHorizontal = gameboard.board.game.push(gameboard.board.game[i]);
            player2MarkHorizontal = [];
        }
        else if(player2Mark === gameboard.board.game[i]) {
            player2MarkHorizontal = gameboard.board.game.push(gameboard.board.game[i]);
            player1MarkHorizontal = [];
        }

        for(let j = 0; 6 >= j; j += 3) {
            if(i > 2) break;

            if(player1Mark === gameboard.board.game[j + i]) {
                player1MarkVertical = gameboard.board.game.push(gameboard.board.game[i]);
                player2MarkVertical = [];
            }
            else if(player2Mark === gameboard.board.game[j + i]) {
                player2MarkVertical = gameboard.board.game.push(gameboard.board.game[i]);
                player1MarkVertical = [];
            }
        }

        
    }

    for(let k = 0; 8 >= k; k+= 4) {
        if(player1MarkObliquely.length === 3) return "Player1 won (skosna)";
        if(player2MarkObliquely.length === 3) return "Player2 won (skosna)";

        if(player1Mark === gameboard.board.game[k]) {
            player1MarkVertical = gameboard.board.game.push(gameboard.board.game[i]);
            player2MarkVertical = [];
        }
        else if(player2Mark === gameboard.board.game[k]) {
            player2MarkVertical = gameboard.board.game.push(gameboard.board.game[i]);
            player1MarkVertical = [];
        }

    }

    player1MarkObliquely = [];
    player2MarkObliquely = [];

    for(let l = 2; 6 >= l; l+= 2) {
        if(player1MarkObliquely.length === 3) return "Player1 won (skosna)";
        if(player2MarkObliquely.length === 3) return "Player2 won (skosna)";

        if(player1Mark === gameboard.board.game[l]) {
                player1MarkObliquely = gameboard.board.game.push(gameboard.board.game[l]);
                player2MarkObliquely = [];
        }
        else if(player2Mark === gameboard.board.game[l]) {
            player2MarkObliquely = gameboard.board.game.push(gameboard.board.game[l]);
            player1MarkObliquely = [];
        }
    } 


}

console.log(getWinner("0", "X"));