/* Deklarerer variabelen "cards" med classen kort der vi har alle bildene */
const cards = document.querySelectorAll('.kort');

/*  */
let hasFlippedCard = false;
let lockBoard = false;
let firstCard
let secondCard;
/*  */
let score = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    /* Hvis første kortet blir flippet */
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  /* Hvis det andre kortet blir flippet */
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.like === secondCard.dataset.like;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  score += 1;
  updateScore();

  resetBoard();
}

function updateScore() {
  const scoreElement = document.querySelector('.score');
  scoreElement.textContent = `Score: ${score}`;
}
