document.addEventListener('DOMContentLoaded', () => {
  
  let field = document.getElementsByClassName('field'),
      displayTurn = document.querySelector('h4'),
      restart = document.getElementById('restart'),
      xScore = document.querySelector('.x-score'),
      oScore = document.querySelector('.o-score'),
      firstMove = 'X',
      first = true,
      gameEnded,
      gameState = ['', '', '', '', '', '', '', ''];

  displayTurn.innerText = displayTurnMessage();

  restart.addEventListener('click', restartGame);

  Array.from(field).forEach((field, index) => {
    field.addEventListener('click', e => handleCellPlayed(e, index));
  });

  function handleCellPlayed(e, index) {
    if(gameEnded) {
      return;
    }
    if(e.target.innerText !== "") {
      return;
    }
    if (!handleResultValidation()) {
      e.target.classList.add("move");
      e.target.innerText = firstMove;
      gameState[index] = firstMove;
      handlePlayerChange(e);
      gameEnded = handleResultValidation();
    }
  }

  function handlePlayerChange(e) {
    if (firstMove == 'X') {
      e.target.innerText == 'X' ? (firstMove = 'O') : (firstMove = 'X');
      displayTurn.innerText = `${firstMove}'s turn`;
    }
    if (firstMove == 'O') {
      e.target.innerText == 'O' ? (firstMove = 'X') : (firstMove = 'O');
      displayTurn.innerText = `${firstMove}'s turn`;
    }
    if (displayTurn.innerText) {
      return '';
    }
  }

  function displayTurnMessage() {
    if (first) {
      return `X starts`;
    } else if (first == false) {
      return `O starts`;
    }
  }

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleResultValidation() {
    let roundWon = false;
    for (var i = 0; i < winningConditions.length; i++) {
      let winningCondition = winningConditions[i];
      let a = gameState[winningCondition[0]];
      let b = gameState[winningCondition[1]];
      let c = gameState[winningCondition[2]];

      if (a === '' || b === '' || c === '') {
        continue;
      }

      if (a == b && b == c) {
        roundWon = true;
        firstMove = a;
        let copy = [...winningCondition]
        markGreen(copy);
        break;
      }
    }
    if (roundWon) {
      displayTurn.innerText = `Player ${firstMove} wins`;
      if(firstMove == "X") {
        xScore.innerText = parseInt(+xScore.innerText + 1);
      } 
      else if (firstMove == "O") {
        oScore.innerText = parseInt(+oScore.innerText + 1);
      }
      return true;
    }
    if (!gameState.includes('')) {
      displayTurn.innerText = 'Draw. No winner';
    }
  }
  function markGreen(d) {
    let r = Array.from(field).filter((x, i) => {
      return i == d[0] || i == d[1] || i == d[2]
    })
    for(var i = 0; i < r.length; i++) {
      r[i].classList.add("correct");
    }
  }

  function restartGame() {
    gameEnded = false;
    gameState.fill('');
    Array.from(field).forEach(field => {
      field.innerText = '';
    });
    first = !first;
    if (first == false) {
      firstMove = 'O';
    } else if(first == true) {
      firstMove = 'X';
    }
    displayTurn.innerText = displayTurnMessage();
    let f = Array.from(field).filter(field => {
        field.classList.remove("correct")
    })
  }
});
