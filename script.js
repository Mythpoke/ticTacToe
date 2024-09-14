
const displayController = (function () {
    let toggle = true;

function drawChars(cube) {

    const markOne = document.getElementById("markOne");
    const playerTwo = document.getElementById("playerTwo");
    const playerOne = document.getElementById("playerOne");
    const turn = document.getElementById("turn");    

    cube.addEventListener("click", ()=> {
        markOne.value === "X" ? cube.textContent = "X": cube.textContent = "O";
        toggle == true ? turn.textContent = playerOne.value + "'s turn": turn.textContent = playerTwo.value + "'s turn";
        toggle = !toggle;
    })
}

function makeGrid() {
    const gridContainer = document.getElementById("gridContainer");

    for(let i = 0; i < 9; i++) {
        let cube = document.createElement("button");
        cube.classList.add("cube");
        gridContainer.appendChild(cube);

        cube.style.width = 400 / 3 + "px";
        cube.style.height = 400 / 3 + "px";

        drawChars(cube);
    }
} 

    return { makeGrid, drawChars };
})()


const gameBoard = (function () {
    
   

function startGame() {

    const submit = document.getElementById("submit");
    const dialog = document.querySelector("dialog");
    const start = document.getElementById("start");
    const playerOne = document.getElementById("playerOne");
    const turn = document.getElementById("turn");

    start.addEventListener("click", ()=> {
        dialog.showModal()
    ;})
    
    submit.addEventListener("click", ()=> {
        dialog.close();
        turn.textContent = playerOne.value + "'s turn";
        start.disabled = true;
    ;})

}

   return { startGame };

})();

gameBoard.startGame();
displayController.makeGrid();


