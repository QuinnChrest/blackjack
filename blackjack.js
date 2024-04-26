var total = { amount: 50, element: null };
var bet = { amount: 0, element: null };
var deck = GetBlackJackDeck(6);
var dealerHand = {
  one: null,
  two: null,
  elementOne: null,
  elementOneIcon: null,
  elementTwo: null,
  elementTwoIcon: null,
  total: null,
};
var playerHand = {
  one: null,
  two: null,
  elementOne: null,
  elementTwo: null,
  total: null,
};

window.onload = () => {
  total.element = document.getElementById("total");
  total.element.innerHTML = total.amount;
  bet.element = document.getElementById("bet");
  bet.element.innerHTML = bet.amount;

  dealerHand.elementOne = document.getElementById("DealerOne");
  dealerHand.elementTwo = document.getElementById("DealerTwo");
  playerHand.elementOne = document.getElementById("PlayerOne");
  playerHand.elementTwo = document.getElementById("PlayerTwo");

  dealerHand.elementOneIcon = document.getElementById("DealerOneIcon");
  dealerHand.elementTwoIcon = document.getElementById("DealerTwoIcon");
  playerHand.elementOneIcon = document.getElementById("PlayerOneIcon");
  playerHand.elementTwoIcon = document.getElementById("PlayerTwoIcon");
};

function PlaceBet() {
  let newBet = document.getElementById("betInput").value;

  if (newBet <= total.amount) {
    bet.amount = newBet;
    bet.element.innerHTML = bet.amount;
  } else {
    alert("This is not a legal bet!");
  }
}

function Deal() {
  deck.pop();

  playerHand.one = deck.pop();
  dealerHand.one = deck.pop();
  playerHand.two = deck.pop();
  dealerHand.two = deck.pop();

  UpdateCard(dealerHand.elementOne, dealerHand.elementOneIcon, dealerHand.one);
  UpdateCard(dealerHand.elementTwo, dealerHand.elementTwoIcon, dealerHand.two);
  UpdateCard(playerHand.elementOne, playerHand.elementOneIcon, playerHand.one);
  UpdateCard(playerHand.elementTwo, playerHand.elementTwoIcon, playerHand.two);
}

function UpdateCard(element, icon, card) {
  element.innerHTML = card.value;
  if (["Hearts", "Diamonds"].includes(card.suit)) {
    element.className = "Value Red";
    if (card.suit == "Hearts") {
      icon.className = "bi bi-suit-heart-fill Red";
    }
    if (card.suit == "Diamonds") {
      icon.className = "bi bi-suit-diamond-fill Red";
    }
  } else {
    element.className = "Value";
    if (card.suit == "Spades") {
      icon.className = "bi bi-suit-spade-fill";
    }
    if (card.suit == "Clubs") {
      icon.className = "bi bi-suit-club-fill";
    }
  }
}
