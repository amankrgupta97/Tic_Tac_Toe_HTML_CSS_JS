let playerTurn = "X";
let gameOver = false;
let playerClick = new Audio("click.wav");
let winSound = new Audio("winnerSound.wav");

// function to check turn of player
const changePlayerTurn = () => {
  return playerTurn === "X" ? "O" : "X";
};

//function to check the winner of the game
const checkWinner = () => {
  let boxMarker = document.getElementsByClassName("box-marker");
  let possibleWinPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  possibleWinPosition.forEach((p) => {
    if (
      boxMarker[p[0]].innerText === boxMarker[p[1]].innerText &&
      boxMarker[p[2]].innerText === boxMarker[p[1]].innerText &&
      boxMarker[p[0]].innerText !== ""
    ) {
      document.querySelector(".turn-info").innerText =
        boxMarker[p[0]].innerText + " Won";
      for (let position = 0; position < 3; position++)
        boxMarker[p[position]].style.color = "Red";
      document
        .querySelector(".win-img")
        .getElementsByTagName("img")[0].style.width = "100px";
      winSound.play();
      gameOver = true;
    }
  });
};

let box = document.getElementsByClassName("box");
Array.from(box).forEach((boxItem) => {
  let boxMarker = boxItem.querySelector(".box-marker");
  boxItem.addEventListener("click", () => {
    if (boxMarker.innerText === "" && !gameOver) {
      boxMarker.innerText = playerTurn;
      playerClick.play();
      playerTurn = changePlayerTurn();
      checkWinner();
      if (!gameOver) {
        document.getElementsByClassName("turn-info")[0].innerText =
          "Turn of " + playerTurn;
      }
    }
  });
});

//reset the game

reset.addEventListener("click", () => {
  let boxMarker = document.querySelectorAll(".box-marker");
  Array.from(boxMarker).forEach((boxItem) => {
    boxItem.innerText = "";
  });
  let possibleWinPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  possibleWinPosition.forEach((p) => {
    for (let position = 0; position < 3; position++)
      boxMarker[p[position]].style.color = "black";
  });
  playerTurn = "X";
  gameOver = false;
  document
    .querySelector(".win-img")
    .getElementsByTagName("img")[0].style.width = "0px";
  document.getElementsByClassName("turn-info")[0].innerText =
    "Turn of " + playerTurn;
});
