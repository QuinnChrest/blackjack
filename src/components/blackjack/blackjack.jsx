import { useEffect, useState } from "react";
import { Deck } from "../../models/deck";
import Card from "../card/card";
import "./blackjack.css";

const GameState = Object.freeze({
  Start: 0,
  Dealt: 1,
  End: 2,
});

function Blackjack() {
  const [player, setPlayer] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [state, setState] = useState(GameState.Start);
  const [bet, setBet] = useState(10);
  const [total, setTotal] = useState(1000);

  var deck = Deck.GetBlackJackDeck(6);

  useEffect(() => CheckForBust(player.find((hand) => hand.current)?.cards), [player]);

  function Deal() {
    deck.pop();

    let playerHand = [];
    let dealerHand = [];

    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());

    setPlayer([{ cards: playerHand, bet: bet, current: true }]);
    setDealer(dealerHand);

    if (CalculateHandTotal(playerHand).total == 21) {
      setState(GameState.End);
      setTotal(total - bet + bet * 2.5);
    } else {
      setState(GameState.Dealt);
      setTotal(total - bet);
    }
  }

  function Bet(amount) {
    setBet(amount == 0 ? 0 : bet + amount);
  }

  function Hit() {
    setPlayer(player.map((hand) => (hand.current ? { ...hand, cards: [...hand.cards, deck.pop()] } : hand)));
  }

  function DoubleDown() {
    setPlayer(player.map((hand) => (hand.current ? { ...hand, cards: [...hand.cards, deck.pop()], bet: hand.bet * 2 } : hand)));
    setTotal(total - bet);
    Stand();
  }

  function Split() {
    let currentHand = player.findIndex((hand) => hand.current);
    let playerHands = [...player];
    playerHands.push({ cards: [playerHands[currentHand].cards.pop()], bet: bet });
    playerHands[currentHand].cards.push(deck.pop());
    setTotal(total - bet);
    setPlayer(playerHands);
  }

  function Stand() {
    if (player.findIndex((hand) => hand.current) < player.length - 1) {
      IncrementHand();
    } else {
      setState(GameState.End);

      let dealerHand = [...dealer];

      let hand = CalculateHandTotal(dealerHand);
      while ((hand.total == 17 && hand.aces > 0) || hand.total < 17) {
        dealerHand.push(deck.pop());
        hand = CalculateHandTotal(dealerHand);
      }

      let dealerHandTotal = CalculateHandTotal(dealerHand).total;
      let chipTotal = total;
      for (const hand of player) {
        let playerHandTotal = CalculateHandTotal(hand.cards).total;

        if (playerHandTotal <= 21) {
          if (dealerHandTotal > 21 || playerHandTotal > dealerHandTotal) {
            chipTotal += hand.bet * 2;
          } else if (dealerHandTotal == playerHandTotal) {
            chipTotal += hand.bet;
          }
        }
      }
      setTotal(chipTotal);
      setDealer(dealerHand);
    }
  }

  function IncrementHand() {
    let index = player.findIndex((hand) => hand.current) + 1;
    setPlayer(player.map((hand, i) => (hand.current ? { ...hand, current: false } : i == index ? { ...hand, current: true, cards: [...hand.cards, deck.pop()] } : hand)));
  }

  function CheckForBust(hand) {
    if (hand != null && CalculateHandTotal(hand).total > 21) {
      Bust();
    }
  }

  function Bust() {
    if (player.findIndex((hand) => hand.current) < player.length - 1) {
      IncrementHand();
    } else {
      setState(GameState.End);
    }
  }

  function Reset() {
    if (deck.length < 75) {
      deck = Deck.GetBlackJackDeck(6);
    }
    setPlayer([]);
    setDealer([]);
    setState(GameState.Start);
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

  function GetResultText(hand) {
    let playerHandTotal = CalculateHandTotal(hand).total;
    let dealerHandTotal = CalculateHandTotal(dealer).total;
    if (playerHandTotal > 21) {
      return "Bust";
    } else if (playerHandTotal == 21 && hand.length == 2) {
      return "Blackjack";
    } else if (dealerHandTotal > 21 || playerHandTotal > dealerHandTotal) {
      return "Win";
    } else if (playerHandTotal == dealerHandTotal) {
      return "Push";
    } else if (playerHandTotal < dealerHandTotal) {
      return "Lose";
    } else {
      return "error";
    }
  }

  return (
    <div className="Table d-flex justify-content-center">
      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-center">
          <div>
            <div className="Hand d-flex">
              {dealer.map((card, index) => (
                <Card card={card} facedown={index == 0 && state == GameState.Dealt} />
              ))}
            </div>
            {GameState.End == state && <h1 className="d-flex justify-content-center mt-3">{CalculateHandTotal(dealer).total}</h1>}
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div>
            <div className={player.length > 1 ? "d-flex flex-row-reverse" : "d-flex justify-content-center"}>
              {player.map((hand, index) => (
                <div className={index > 0 ? "me-5" : ""}>
                  {(state == GameState.End || (CalculateHandTotal(hand.cards).total == 21 && hand.cards.length == 2)) && (
                    <h1 className="d-flex justify-content-center mb-3">{GetResultText(hand.cards)}</h1>
                  )}
                  {state != GameState.End && <h1 className="d-flex justify-content-center mb-3">{CalculateHandTotal(hand.cards).total}</h1>}
                  <div className={`Hand d-flex ${hand.current && player.length > 1 && state == GameState.Dealt ? "CurrentHand" : ""}`}>
                    {hand.cards.map((card) => (
                      <Card card={card} />
                    ))}
                  </div>
                  <h1 className="d-flex justify-content-center mt-3">${hand.bet}</h1>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-3">
              <h4 className="fw-bold">Total:</h4>
              <h4 className="ms-1">${total}</h4>
              {state == GameState.Start && (
                <>
                  <h4 className="fw-bold ms-3">Bet:</h4>
                  <h4 className="ms-1">${bet}</h4>
                </>
              )}
            </div>

            <div className="Menu d-flex justify-content-center mt-3">
              {state == GameState.Start && (
                <div>
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" disabled={bet == 0} onClick={() => Deal()}>
                      Deal
                    </button>
                  </div>
                  <div className="mt-3 Chips">
                    <button type="button" className="TwentyFive" disabled={bet + 25 > total} onClick={() => Bet(25)}>
                      +25
                    </button>
                    <button type="button" className="Ten" disabled={bet + 10 > total} onClick={() => Bet(10)}>
                      +10
                    </button>
                    <button type="button" className="Five" disabled={bet + 5 > total} onClick={() => Bet(5)}>
                      +5
                    </button>
                    <button type="button" className="One" disabled={bet + 1 > total} onClick={() => Bet(1)}>
                      +1
                    </button>
                    <button type="button" onClick={() => Bet(0)}>
                      0
                    </button>
                    <button type="button" className="One" disabled={bet - 1 < 0} onClick={() => Bet(-1)}>
                      -1
                    </button>
                    <button type="button" className="Five" disabled={bet - 5 < 0} onClick={() => Bet(-5)}>
                      -5
                    </button>
                    <button type="button" className="Ten" disabled={bet - 10 < 0} onClick={() => Bet(-10)}>
                      -10
                    </button>
                    <button type="button" className="TwentyFive" disabled={bet - 25 < 0} onClick={() => Bet(-25)}>
                      -25
                    </button>
                  </div>
                </div>
              )}

              {state == GameState.Dealt && (
                <>
                  <button type="button" className="btn btn-primary" onClick={() => Hit()}>
                    Hit
                  </button>
                  <button type="button" className="btn btn-primary" disabled={player.some((hand) => hand.current && (hand.bet > total || hand.cards.length > 2))} onClick={() => DoubleDown()}>
                    Double Down
                  </button>
                  <button type="button" className="btn btn-primary" disabled={!player.some((hand) => hand.current && hand.cards[0].value == hand.cards[1].value)} onClick={() => Split()}>
                    Split
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => Stand()}>
                    Stand
                  </button>
                </>
              )}

              {GameState.End == state && (
                <>
                  <button type="button" className="btn btn-primary" onClick={() => Reset()}>
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blackjack;
