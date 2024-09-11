const gridContainer = document.getElementById("gridContainer");

for(let i = 0; i < 9; i++) {
    let cube = document.createElement("div");
    cube.classList.add("cube");
    gridContainer.appendChild(cube);

    cube.style.width = 400 / 3 + "px";
    cube.style.height = 400 / 3 + "px";
    cube.textContent = "X";
}