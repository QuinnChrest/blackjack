export class Deck {
  static #STANDARD_DECK = [
    { value: "A", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "2", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "3", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "4", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "5", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "6", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "7", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "8", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "9", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "10", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "J", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "Q", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "K", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "A", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "2", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "3", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "4", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "5", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "6", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "7", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "8", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "9", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "10", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "J", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "Q", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "K", suit: "Diamonds", icon: "bi bi-suit-diamond-fill", color: "Red" },
    { value: "A", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "2", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "3", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "4", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "5", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "6", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "7", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "8", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "9", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "10", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "J", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "Q", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "K", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "A", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "2", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "3", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "4", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "5", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "6", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "7", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "8", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "9", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "10", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "J", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "Q", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "K", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
  ];

  static TestDeck = [
    { value: "K", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "A", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "2", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "3", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "4", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "5", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "6", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "7", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "8", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "9", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "10", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "J", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "J", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "Q", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "K", suit: "Clubs", icon: "bi bi-suit-club-fill", color: "Black" },
    { value: "A", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "10", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "10", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "4", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
    { value: "10", suit: "Hearts", icon: "bi bi-suit-heart-fill", color: "Red" },
    { value: "4", suit: "Spades", icon: "bi bi-suit-spade-fill", color: "Black" },
  ];

  static GetBlackJackDeck(numberOfDecks) {
    let deck = [];
    for (let i = 0; i < numberOfDecks; i++) {
      deck = deck.concat(this.#STANDARD_DECK);
    }
    this.#ShuffleDeck(deck, 7);
    return deck;
  }

  // Fisher-Yates shuffle
  static #ShuffleDeck(deck, numberOfShuffles) {
    for (let shuffle = 0; shuffle < numberOfShuffles; shuffle++) {
      for (let i = deck.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1));

        // Swap the current element with the random element
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      }
    }
  }
}
