function makeGrid() {
    const gridContainer = document.getElementById("gridContainer");

    for(let i = 0; i < 9; i++) {
        let cube = document.createElement("button");
        cube.classList.add("cube");
        gridContainer.appendChild(cube);

        cube.style.width = 400 / 3 + "px";
        cube.style.height = 400 / 3 + "px";
        cube.textContent = "X";
    }
} 

makeGrid();

const start = document.getElementById("start");
const dialog = document.querySelector("dialog");
const playerOne = document.getElementById("playerOne");
const playerTwo = document.getElementById("playerTwo");
const markOne = document.getElementById("markOne");
const markTwo = document.getElementById("markTwo");
const submit = document.getElementById("submit");

const turn = document.getElementById("turn");

start.addEventListener("click", ()=> {
    dialog.showModal()
;})
submit.addEventListener("click", ()=> {
    dialog.close();
    console.log(submit.value);
    turn.textContent = playerOne.value;
;})

