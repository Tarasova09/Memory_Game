let errors = 0;
let cardList = [
  "darkness",
  "double",
  "fairy",
  "fighting",
  "fire",
  "grass",
  "lightning",
  "metal",
  "psychic",
  "water"
]

let cardSet;
let board = [];
let rows = 4;
let columns = 5;

let card1Selected;
let card2Selected;

window.onload = function() {
  shuffleCards();
  startGame();
}

function shuffleCards() {
  cardSet = cardList.concat(cardList);

  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length);

    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cardImg = cardSet.pop();
      row.push(cardImg);

      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = cardImg + ".jpg";
      card.classList.add("card");
      card.addEventListener("click", selectCard);
      document.getElementById("board").append(card);
    }

    board.push(row);
  }

  setTimeout(hideCards, 1000);
}

function hideCards() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = "back.jpg";
    }
  }
}

function selectCard() {
  if (this.src.includes("back")) {
    if (!card1Selected) {
      card1Selected = this;

      let coords = card1Selected.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card1Selected.src = board[r][c] + ".jpg";
    }

    else if (!card2Selected && this != card1Selected) {
      card2Selected = this;

      let coords = card2Selected.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card2Selected.src = board[r][c] + ".jpg";
      setTimeout(update, 1000);
    }
  }
}

function update() {
  if (card1Selected.src != card2Selected.src) {
    card1Selected.src = "back.jpg";
    card2Selected.src = "back.jpg";
    errors += 1;
    document.getElementById("errors").innerText = errors;
  }

  card1Selected = null;
  card2Selected = null;
}