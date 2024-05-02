import { useState } from "react";
import { Deck } from "../../models/deck";
import Card from "../card/card";
import "./blackjack.css";

function Blackjack() {
  const [total, setTotal] = useState(50);
  const [bet, setBet] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [betInput, setBetInput] = useState(0);
  const [endTurn, setEndTurn] = useState(false);

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

    setTotal(total - bet);
  }

  function Bet() {
    if (betInput >= 0 && betInput <= total) {
      setBet(betInput);
    } else {
      alert("invalid bet");
    }
  }

  function Hit() {
    let tempPlayerHand = [...playerHand, deck.pop()];

    setPlayerHand(tempPlayerHand);

    let handTotal = 0;
    for (const card of tempPlayerHand) {
      if (isNaN(card.value)) {
        if (card.value == "A") {
          handTotal += 1;
        } else {
          handTotal += 10;
        }
      } else {
        handTotal += parseInt(card.value);
      }
    }

    if (handTotal > 21) {
      setTimeout(() => {
        Bust();
      }, 2000);
    }
  }

  function DoubleDown() {
    setBet;
  }

  function Split() {
    console.log("Split");
  }

  function Stand() {
    setEndTurn(true);
  }

  function Bust() {
    setBet(0);
    Reset();
  }

  function Reset() {
    setPlayerHand([]);
    setDealerHand([]);
  }

  return (
    <>
      <div className="Hand d-flex">
        {dealerHand.map((card, index) => (
          <Card card={card} facedown={index == 0 && !endTurn} />
        ))}
      </div>

      <div className="Hand d-flex">
        {playerHand.map((card) => (
          <Card card={card} />
        ))}
      </div>

      <div>
        <span className="fw-bold">Total:</span>
        <span className="ms-1">{total}</span>
        <span className="fw-bold ms-3">Bet:</span>
        <span className="ms-1">{bet}</span>
      </div>

      {playerHand.length == 0 ? (
        <div className="menu">
          <button type="button" className="btn btn-primary" onClick={() => Deal()}>
            Deal
          </button>
          <input type="number" value={betInput} onChange={(event) => setBetInput(event.target.value)} />
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
