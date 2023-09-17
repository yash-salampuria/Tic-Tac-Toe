"use strict";

const tiles = document.getElementsByClassName("tile");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const result = document.querySelector(".result");
const button = document.querySelector("button");
const turn = document.querySelector(".container p");

turn.textContent = "Turn : Player 1";

let clickCount = 1;

let gameMatrix = [
  [11, 12, 13],
  [14, 15, 16],
  [17, 18, 19],
];

function updateMatrix(className, player) {
  switch (className) {
    case "tile--1":
      gameMatrix[0][0] = player;
      break;
    case "tile--2":
      gameMatrix[0][1] = player;
      break;
    case "tile--3":
      gameMatrix[0][2] = player;
      break;
    case "tile--4":
      gameMatrix[1][0] = player;
      break;
    case "tile--5":
      gameMatrix[1][1] = player;
      break;
    case "tile--6":
      gameMatrix[1][2] = player;
      break;

    case "tile--7":
      gameMatrix[2][0] = player;
      break;

    case "tile--8":
      gameMatrix[2][1] = player;
      break;

    case "tile--9":
      gameMatrix[2][2] = player;
      break;
  }
}

function checkWinner() {
    let success = true;
    for(let i = 0; i < 3; i++) {
        success = true;
        for(let j = 1; j < 3; j++) {
            if(gameMatrix[i][j-1] !== gameMatrix[i][j]) {
                success = false;
                break;
            } 
        }
        if(success) { return true; }
    }
    for(let i = 0; i < 3; i++) {
        success = true;
        for(let j = 1; j < 3; j++) {
            if(gameMatrix[j-1][i] !== gameMatrix[j][i]) {
                success = false;
                break;
            } 
        }
        if(success) { return true; }
    }
    if(gameMatrix[0][0] === gameMatrix [1][1] && gameMatrix[1][1] === gameMatrix[2][2]) return true;
    if(gameMatrix[0][2] === gameMatrix [1][1] && gameMatrix[1][1] === gameMatrix[2][0]) return true;
    return false;
}

let className = "";

for (let i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener("click", () => {
    console.log(clickCount);
    if (clickCount % 2 !== 0) {
      tiles[i].classList.add("color-x");
      tiles[i].textContent = "X";
      className = tiles[i].classList[1];
      updateMatrix(className, 1);
      console.log(gameMatrix);
      if(checkWinner()) {
        result.textContent = "Player 1 Wins 🥳🥳";
        overlay.classList.remove("hidden");
        modal.classList.remove("hidden");
        button.addEventListener('click', ()=> {
            window.location.reload();
        });
      }
      turn.textContent = "Turn : Player 2";
      clickCount++;
    } else {
      tiles[i].classList.add("color-o");
      tiles[i].textContent = "O";
      className = tiles[i].classList[1];
      updateMatrix(className, 0);
      console.log(gameMatrix);
      if(checkWinner()) {
        result.textContent = "Player 2 Wins 🥳🥳";
        overlay.classList.remove("hidden");
        modal.classList.remove("hidden");
        button.addEventListener('click', ()=> {
            window.location.reload();
        });
      }
      clickCount++;
      turn.textContent = "Turn : Player 1";
    }
  });
}
