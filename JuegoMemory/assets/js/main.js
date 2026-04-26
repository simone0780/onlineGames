const emojis = ['🍎','🍌','🍓','🍒','🍍','🥝','🍉','🍑'];
let cards = [...emojis, ...emojis];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

const board = document.getElementById('gameBoard');
const estado = document.getElementById('status');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = '';
  estado.textContent = '';
  matches = 0;

  shuffle(cards);

  cards.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <div class="card-face front">${emoji}</div>
      <div class="card-face back">❓</div>
    `;

    card.addEventListener('click', () => flipCard(card, emoji));
    board.appendChild(card);
  });
}

function flipCard(card, emoji) {
  if (lockBoard || card === firstCard) return;

  card.classList.add('flip');

  if (!firstCard) {
    firstCard = { card, emoji };
    return;
  }

  secondCard = { card, emoji };
  checkMatch();
}

function checkMatch() {
  if (firstCard.emoji === secondCard.emoji) {
    matches++;
    resetTurn();

    if (matches === emojis.length) {
      estado.textContent = '🎉 ¡Has ganado!';
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.card.classList.remove('flip');
      secondCard.card.classList.remove('flip');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function restartGame() {
  createBoard();
}

createBoard();