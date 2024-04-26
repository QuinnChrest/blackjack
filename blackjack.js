var total = { amount: 50, element: null };
var bet = { amount: 0, element: null };
var deck = GetBlackJackDeck(6);
var dealer = { hand: [], element: null, total: null };
var player = { hand: [], element: null, total: null };
var input = null;

window.onload = () => {
  total.element = document.getElementById("total");
  total.element.innerHTML = total.amount;
  bet.element = document.getElementById("bet");
  bet.element.innerHTML = bet.amount;
  input = document.getElementById("input");
  dealer.element = document.getElementById("dealer");
  player.element = document.getElementById("player");
};

function PlaceBet() {
  if (input.value <= total.amount && input.value > 0) {
    bet.amount = input.value;
    bet.element.innerHTML = bet.amount;
  } else {
    alert("This is not a legal bet!");
  }
}

function Deal() {
  deck.pop();
  DrawCard(player);
  DrawCard(dealer);
  DrawCard(player);
  DrawCard(dealer);
}

function DrawCard(playerObject) {
  let card = deck.pop();
  playerObject.hand.push(card);
  let additionalClass = ["Hearts", "Diamonds"].includes(card.suit) ? "Red" : "";
  playerObject.element.innerHTML +=
    '<div class="Card"><div class="Value ' +
    additionalClass +
    '">' +
    card.value +
    '</div><div class="text-center"><i class="' +
    card.icon +
    '"></i></div></div>';
}
