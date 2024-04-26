var total = { amount: 50, element: null };
var bet = { amount: 0, element: null };
var deck = GetBlackJackDeck(6);
var dealer = { hand: [], element: null, total: null };
var player = { hand: [], element: null, total: null };
var input = null;
var preDealMenu = null;
var postDealMenu = { container: null, split: null, dd: null };

window.onload = () => {
  total.element = document.getElementById("total");
  total.element.innerHTML = total.amount;
  bet.element = document.getElementById("bet");
  bet.element.innerHTML = bet.amount;
  input = document.getElementById("input");
  dealer.element = document.getElementById("dealer");
  player.element = document.getElementById("player");
  preDealMenu = document.getElementById("pre-deal-menu");
  postDealMenu.container = document.getElementById("post-deal-menu");
  postDealMenu.split = document.getElementById("split");
  postDealMenu.dd = document.getElementById("dd");

  postDealMenu.container.className = "Hide";
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
  preDealMenu.className = "Hide";
  postDealMenu.container.className = "";

  deck.pop();
  DrawCard(player);
  DrawCard(dealer, true);
  DrawCard(player);
  DrawCard(dealer);

  if (player.hand[0].value == player.hand[1].value) {
    postDealMenu.split.disabled = false;
  } else {
    postDealMenu.split.disabled = true;
  }
}

function DrawCard(playerObject, faceDown = false) {
  let card = deck.pop();
  playerObject.hand.push(card);
  let additionalClass = ["Hearts", "Diamonds"].includes(card.suit) ? "Red" : "";
  playerObject.element.innerHTML +=
    '<div class="Card ' +
    (faceDown ? "FaceDown" : "") +
    '"><div class="Value ' +
    additionalClass +
    '">' +
    card.value +
    '</div><div class="text-center"><i class="' +
    card.icon +
    '"></i></div></div>';
}

function Hit() {
  DrawCard(player);
}

function DoubleDown() {}

function Split() {}

function Stand() {}
