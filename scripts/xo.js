let grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

let filledSlots = [];
let emptySlots = [];
let endGame = false;

function randomPlay() {
  emptySlots.length = 0;
  for (const row in grid) {
    for (const col in grid[row]) {
      if (grid[row][col] === 0) {
        emptySlots.push(`${row},${col}`);
      }
    }
  }
  if (emptySlots.length) {
    let randomSlot = emptySlots[Math.floor(Math.random() * emptySlots.length)].split(",");
    grid[randomSlot[0]][randomSlot[1]] = 'X';
    filledSlots.push(`${randomSlot[0]},${randomSlot[1]}`);
    checkGame();
    if (filledSlots.length < 9 && endGame === false) {
      playerMove();
    }
  }
}

function playerMove() {
  if (emptySlots.length) {
    let playerSlot = prompt(`${grid[0]}\n${grid[1]}\n${grid[2]}\nWhere would you like to place your "O" \nNote: syntax is "row, col"`);
    while (filledSlots.includes(playerSlot)) {
      playerSlot = prompt(`${grid[0]}\n${grid[1]}\n${grid[2]}\nError: you wrote an already filled spot`);
    }
    filledSlots.push(`${playerSlot}`);
    grid[playerSlot[0]][playerSlot[2]] = 'O';
    checkGame();
    if (filledSlots.length < 9 && endGame === false) {
      console.log(filledSlots.length)
      randomPlay();
    }
  }
}

function checkGame() {
  for (const row in grid) {
    for (const col in grid[row]) {
      if (grid[row][col] === 'X' || grid[row][col] === 'O') {
        let currentRow = grid[row];
        console.log(col);
        let currentCol = grid.map(x => x.slice(col, Number(col)+1)).flat();
        console.log(currentCol);
        if (currentRow.every(elm => elm === "O") || currentCol.every(elm => elm === "O")) {
          endGame = true;
          return console.log('O Wins!!');
        } else if (currentRow.every(elm => elm === "X") || currentCol.every(elm => elm === "X")) {
          endGame = true;
          return console.log('X Wins!!');
        }
      }
    }
  }
}

randomPlay();
console.log(`Game Over!\n${grid[0]}\n${grid[1]}\n${grid[2]}`);
