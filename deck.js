const STANDARD_DECK = [
  { value: "A", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "2", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "3", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "4", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "5", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "6", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "7", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "8", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "9", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "10", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "J", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "Q", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "K", suit: "Hearts", icon: "bi bi-suit-heart-fill Red" },
  { value: "A", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "2", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "3", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "4", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "5", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "6", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "7", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "8", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "9", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "10", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "J", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "Q", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "K", suit: "Diamonds", icon: "bi bi-suit-diamond-fill Red" },
  { value: "A", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "2", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "3", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "4", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "5", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "6", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "7", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "8", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "9", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "10", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "J", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "Q", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "K", suit: "Clubs", icon: "bi bi-suit-club-fill" },
  { value: "A", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "2", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "3", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "4", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "5", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "6", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "7", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "8", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "9", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "10", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "J", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "Q", suit: "Spades", icon: "bi bi-suit-spade-fill" },
  { value: "K", suit: "Spades", icon: "bi bi-suit-spade-fill" },
];

function GetBlackJackDeck(numberOfDecks) {
  let deck = [];
  for (let i = 0; i < numberOfDecks; i++) {
    deck = deck.concat(STANDARD_DECK);
  }
  ShuffleDeck(deck);
  return deck;
}

// Fisher-Yates shuffle
function ShuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    let j = Math.floor(Math.random() * (i + 1));

    // Swap the current element with the random element
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}
