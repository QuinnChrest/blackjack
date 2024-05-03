import { useEffect, useState } from "react";
import { Deck } from "../../models/deck";
import Card from "../card/card";
import "./blackjack.css";

const GameState = Object.freeze({
  Start: 0,
  Dealt: 1,
  Bust: 2,
  Stand: 3,
});

function Blackjack() {
  const [total, setTotal] = useState(1000);
  const [bet, setBet] = useState(10);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [state, setState] = useState(GameState.Start);

  const [disableSplit, setDisableSplit] = useState(true);

  var deck = Deck.GetBlackJackDeck(6);

  useEffect(() => CheckForBust(playerHand), [playerHand]);

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

    if (CalculateHandTotal(tempPlayerHand) == 21) {
      setState(GameState.Stand);

      setTotal(total + bet * 2.5);
    } else {
      setState(GameState.Dealt);

      setTotal(total - bet);
    }
  }

  function Bet(amount) {
    if (amount == 0) {
      setBet(0);
    } else {
      setBet(bet + amount);
    }
  }

  function Hit() {
    setPlayerHand([...playerHand, deck.pop()]);
  }

  function DoubleDown() {
    setTotal(total - bet);
    setBet(bet * 2);
    setPlayerHand([...playerHand, deck.pop()]);
    setState(GameState.Stand);
    Stand();
  }

  function Split() {
    console.log("Split");
  }

  function Stand() {
    setState(GameState.Stand);

    let tempDealerHand = [...dealerHand];

    let hand = CalculateHandTotal(tempDealerHand);
    while ((hand.total == 17 && hand.aces > 0) || hand.total < 17) {
      tempDealerHand.push(deck.pop());
      hand = CalculateHandTotal(tempDealerHand);
    }

    let dealerHandTotal = CalculateHandTotal(tempDealerHand).total;
    let playerHandTotal = CalculateHandTotal(playerHand).total;
    if (dealerHandTotal > 21 || playerHandTotal > dealerHandTotal) {
      console.log("win");
      setTotal(total + bet * 2);
    } else if (dealerHandTotal > playerHandTotal) {
      console.log("lose");
      setTotal(total - bet);
    } else if (dealerHandTotal == playerHandTotal) {
      console.log("push");
      setTotal(total + bet);
    }

    setDealerHand(tempDealerHand);
  }

  function Bust() {
    setState(GameState.Bust);
  }

  function Reset() {
    if (deck.length < 75) {
      deck = Deck.GetBlackJackDeck(6);
    }
    setPlayerHand([]);
    setDealerHand([]);
    setState(GameState.Start);
  }

  function CheckForBust(hand) {
    if (CalculateHandTotal(hand).total > 21) {
      Bust();
    }
  }

  function CalculateHandTotal(hand) {
    let handTotal = 0,
      aces = 0;
    for (const card of hand) {
      if (isNaN(card.value)) {
        if (card.value == "A") {
          handTotal += 11;
          aces++;
        } else {
          handTotal += 10;
        }
      } else {
        handTotal += parseInt(card.value);
      }
    }

    while (handTotal > 21 && aces > 0) {
      handTotal -= 10;
      aces--;
    }

    return { total: handTotal, aces: aces };
  }

  return (
    <>
      <div className="Hand d-flex">
        {dealerHand.map((card, index) => (
          <Card card={card} facedown={index == 0 && state == GameState.Dealt} />
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

      {state == GameState.Start && (
        <div>
          <div>
            <button type="button" className="btn btn-primary" disabled={bet == 0} onClick={() => Deal()}>
              Deal
            </button>
          </div>
          <div>
            <button type="button" className="btn btn-primary" disabled={bet + 50 > total} onClick={() => Bet(50)}>
              +50
            </button>
            <button type="button" className="btn btn-primary" disabled={bet + 25 > total} onClick={() => Bet(25)}>
              +25
            </button>
            <button type="button" className="btn btn-primary" disabled={bet + 10 > total} onClick={() => Bet(10)}>
              +10
            </button>
            <button type="button" className="btn btn-primary" disabled={bet + 5 > total} onClick={() => Bet(5)}>
              +5
            </button>
            <button type="button" className="btn btn-primary" disabled={bet + 1 > total} onClick={() => Bet(1)}>
              +1
            </button>
            <button type="button" className="btn btn-primary" onClick={() => Bet(0)}>
              0
            </button>
            <button type="button" className="btn btn-primary" disabled={bet - 1 < 0} onClick={() => Bet(-1)}>
              -1
            </button>
            <button type="button" className="btn btn-primary" disabled={bet - 5 < 0} onClick={() => Bet(-5)}>
              -5
            </button>
            <button type="button" className="btn btn-primary" disabled={bet - 10 < 0} onClick={() => Bet(-10)}>
              -10
            </button>
            <button type="button" className="btn btn-primary" disabled={bet - 25 < 0} onClick={() => Bet(-25)}>
              -25
            </button>
            <button type="button" className="btn btn-primary" disabled={bet - 50 < 0} onClick={() => Bet(-50)}>
              -50
            </button>
          </div>
        </div>
      )}

      {state == GameState.Dealt && (
        <div className="menu">
          <button type="button" className="btn btn-primary" onClick={() => Hit()}>
            Hit
          </button>
          <button type="button" className="btn btn-primary" disabled={bet > total || playerHand.length > 2} onClick={() => DoubleDown()}>
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

      {[GameState.Bust, GameState.Stand].includes(state) && (
        <div className="menu">
          <button type="button" className="btn btn-primary" onClick={() => Reset()}>
            Reset
          </button>
        </div>
      )}
    </>
  );
}

export default Blackjack;