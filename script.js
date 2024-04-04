let square = 1;
const gameboard = (function () {
        const board = {
            game: [0, 1 ,2, 3, 4, 5, 6, 7, 8],
        }

        return {
            board,
        }
})()
    

    const player = function (name, square) {
        const result = [];
        const makeMove = () =>
       result.push(gameboard.board.game.splice(square - 1, 1, null));
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

        player1 = player(player1.name, +prompt(player1.name + " Choose a number from 1 to 9"));
        player2 = player(player2.name, +prompt(player2.name + " Choose a number from 1 to 9"));

    } while(
        isNaN(player1.square) || isNaN(player2.square) ||
        !(player1.square >= 1 && player1.square <= 9) ||
        !(player2.square >= 1 && player2.square <= 9) ||
        player1.square === player2.square
    );

    if(player1.result)
}

game();

