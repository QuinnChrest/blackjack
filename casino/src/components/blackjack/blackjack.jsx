import { useState } from "react";
import { Deck } from "../../models/deck";
import Card from "../card/card";
import "./blackjack.css";

function Blackjack() {
  const [total, setTotal] = useState(50);
  const [bet, setBet] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  const [disableDD, setDisableDD] = useState(false);
  const [disableSplit, setDisableSplit] = useState(true);

  var deck = Deck.GetBlackJackDeck(6);

  function Deal() {
    deck.pop();

    let tempPlayerHand = [];
    let tempDealerHand = [];

    tempPlayerHand.push(deck.pop());
    tempDealerHand.push(deck.pop());
    tempPlayerHand.push(deck.pop());
    tempDealerHand.push(deck.pop());

    setPlayerHand(tempPlayerHand);
    setDealerHand(tempDealerHand);

    setDisableSplit(tempPlayerHand[0].value != tempPlayerHand[1].value);
    setDisableDD(bet * 2 > total);
  }

  function Bet() {
    console.log(playerHand);
    console.log("Bet");
  }

  function Hit() {
    setPlayerHand([...playerHand, deck.pop()]);
  }

  function DoubleDown() {
    console.log("Double Down");
  }

  function Split() {
    console.log("Split");
  }

  function Stand() {
    console.log("Stand");
  }

  return (
    <>
      <div className="Hand d-flex">
        {dealerHand.map((card, index) => (
          <Card card={card} facedown={index == 0} />
        ))}
      </div>

      <div className="Hand d-flex">
        {playerHand.map((card) => (
          <Card card={card} />
        ))}
      </div>

      <div>
        <span className="fw-bold">Total:</span>
        <span>{total}</span>
        <span className="fw-bold ms-3">Bet:</span>
        <span>{bet}</span>
      </div>

      {playerHand.length == 0 ? (
        <div className="menu">
          <button type="button" className="btn btn-primary" onClick={() => Deal()}>
            Deal
          </button>
          <input type="text" />
          <button type="button" className="btn btn-primary" onClick={() => Bet()}>
            Bet
          </button>
        </div>
      ) : (
        <div className="menu">
          <button type="button" className="btn btn-primary" onClick={() => Hit()}>
            Hit
          </button>
          <button type="button" className="btn btn-primary" disabled={disableDD} onClick={() => DoubleDown()}>
            Double Down
          </button>
          <button type="button" className="btn btn-primary" disabled={disableSplit} onClick={() => Split()}>
            Split
          </button>
          <button type="button" className="btn btn-primary" onClick={() => Stand()}>
            Stand
          </button>
        </div>
      )}
    </>
  );
}

export default Blackjack;
