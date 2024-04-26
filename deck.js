const STANDARD_DECK = [
  { value: "A", suit: "Hearts" },
  { value: "2", suit: "Hearts" },
  { value: "3", suit: "Hearts" },
  { value: "4", suit: "Hearts" },
  { value: "5", suit: "Hearts" },
  { value: "6", suit: "Hearts" },
  { value: "7", suit: "Hearts" },
  { value: "8", suit: "Hearts" },
  { value: "9", suit: "Hearts" },
  { value: "10", suit: "Hearts" },
  { value: "J", suit: "Hearts" },
  { value: "Q", suit: "Hearts" },
  { value: "K", suit: "Hearts" },
  { value: "A", suit: "Diamonds" },
  { value: "2", suit: "Diamonds" },
  { value: "3", suit: "Diamonds" },
  { value: "4", suit: "Diamonds" },
  { value: "5", suit: "Diamonds" },
  { value: "6", suit: "Diamonds" },
  { value: "7", suit: "Diamonds" },
  { value: "8", suit: "Diamonds" },
  { value: "9", suit: "Diamonds" },
  { value: "10", suit: "Diamonds" },
  { value: "J", suit: "Diamonds" },
  { value: "Q", suit: "Diamonds" },
  { value: "K", suit: "Diamonds" },
  { value: "A", suit: "Clubs" },
  { value: "2", suit: "Clubs" },
  { value: "3", suit: "Clubs" },
  { value: "4", suit: "Clubs" },
  { value: "5", suit: "Clubs" },
  { value: "6", suit: "Clubs" },
  { value: "7", suit: "Clubs" },
  { value: "8", suit: "Clubs" },
  { value: "9", suit: "Clubs" },
  { value: "10", suit: "Clubs" },
  { value: "J", suit: "Clubs" },
  { value: "Q", suit: "Clubs" },
  { value: "K", suit: "Clubs" },
  { value: "A", suit: "Spades" },
  { value: "2", suit: "Spades" },
  { value: "3", suit: "Spades" },
  { value: "4", suit: "Spades" },
  { value: "5", suit: "Spades" },
  { value: "6", suit: "Spades" },
  { value: "7", suit: "Spades" },
  { value: "8", suit: "Spades" },
  { value: "9", suit: "Spades" },
  { value: "10", suit: "Spades" },
  { value: "J", suit: "Spades" },
  { value: "Q", suit: "Spades" },
  { value: "K", suit: "Spades" },
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
