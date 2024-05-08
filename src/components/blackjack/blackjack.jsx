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
  const [total, setTotal] = useState(1000);
  const [initialBet, setInitialBet] = useState(10);
  const [bets, setBets] = useState([]);
  const [player, setPlayer] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [currentHand, setCurrentHand] = useState(0);
  const [state, setState] = useState(GameState.Start);

  var deck = Deck.GetBlackJackDeck(6);

  useEffect(() => CheckForBust(player[currentHand]), [player]);

  function Deal() {
    deck.pop();

    let tempPlayerHand = [];
    let tempDealerHand = [];

    tempPlayerHand.push(deck.pop());
    tempDealerHand.push(deck.pop());
    tempPlayerHand.push(deck.pop());
    tempDealerHand.push(deck.pop());

    setPlayer([tempPlayerHand]);
    setDealer(tempDealerHand);

    setBets([initialBet]);

    if (CalculateHandTotal(tempPlayerHand).total == 21) {
      setState(GameState.End);
      setTotal(total - initialBet + initialBet * 2.5);
    } else {
      setState(GameState.Dealt);
      setTotal(total - initialBet);
    }
  }

  function Bet(amount) {
    if (amount == 0) {
      setInitialBet(0);
    } else {
      setInitialBet(bet + amount);
    }
  }

  function Hit() {
    if (GameState.Dealt == state) {
      let playerHand = [...player[currentHand], deck.pop()];
      let playerHands = [...player];
      playerHands[currentHand] = playerHand;
      setPlayer(playerHands);
    }
  }

  function DoubleDown() {
    setTotal(total - bets[currentHand]);
    let tempBets = [...bets];
    tempBets[currentHand] += tempBets[currentHand];
    setBets(tempBets);
    Hit();
    Stand();
  }

  function Split() {
    let playerHands = [...player];
    playerHands.push([playerHands[currentHand].pop()]);
    playerHands[currentHand].push(deck.pop());
    setTotal(total - initialBet);
    setPlayer(playerHands);
  }

  function Stand() {
    if (player.length - 1 > currentHand) {
      let curHand = currentHand + 1;
      setCurrentHand(curHand);

      let playerHands = [...player];
      if (playerHands[curHand].length < 2) {
        playerHands[curHand] = [...playerHands[curHand], deck.pop()];
        setPlayer(playerHands);
      }
    } else {
      setState(GameState.End);

      let tempDealerHand = [...dealer];

      let hand = CalculateHandTotal(tempDealerHand);
      while ((hand.total == 17 && hand.aces > 0) || hand.total < 17) {
        tempDealerHand.push(deck.pop());
        hand = CalculateHandTotal(tempDealerHand);
      }

      let dealerHandTotal = CalculateHandTotal(tempDealerHand).total;
      let chipTotal = total;
      for (let i = 0; i < player.length; i++) {
        let playerHandTotal = CalculateHandTotal(player[i]).total;
        let handBet = bets[i];

        if (playerHandTotal <= 21) {
          if (dealerHandTotal > 21 || playerHandTotal > dealerHandTotal) {
            chipTotal += handBet * 2;
          } else if (dealerHandTotal == playerHandTotal) {
            chipTotal += handBet;
          }
        }
      }
      setTotal(chipTotal);
      setDealer(tempDealerHand);
    }
  }

  function Bust() {
    if (player.length - 1 > currentHand) {
      let curHand = currentHand + 1;
      setCurrentHand(curHand);

      let playerHands = [...player];
      if (playerHands[curHand].length < 2) {
        playerHands[curHand] = [...playerHands[curHand], deck.pop()];
        setPlayer(playerHands);
      }
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
    setCurrentHand(0);
    setState(GameState.Start);
  }

  function CheckForBust(hand) {
    if (hand != null && CalculateHandTotal(hand).total > 21) {
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
        <div className="Dealer d-flex justify-content-center">
          <div>
            <div className="Hand d-flex">
              {dealer.map((card, index) => (
                <Card card={card} facedown={index == 0 && state == GameState.Dealt} />
              ))}
            </div>
            {GameState.End == state && <h1 className="d-flex justify-content-center mt-3">{CalculateHandTotal(dealer).total}</h1>}
          </div>
        </div>

        <div className="Player d-flex justify-content-center">
          <div>
            <div className={player.length > 1 ? "d-flex flex-row-reverse" : "d-flex justify-content-center"}>
              {player.map((hand, index) => (
                <div className={index > 0 ? "me-5" : ""}>
                  {(state == GameState.End || (CalculateHandTotal(hand).total == 21 && hand.length == 2)) && <h1 className="d-flex justify-content-center mb-3">{GetResultText(hand)}</h1>}
                  {state != GameState.End && <h1 className="d-flex justify-content-center mb-3">{CalculateHandTotal(hand).total}</h1>}
                  <div className={`Hand d-flex ${index == currentHand && player.length > 1 && state == GameState.Dealt ? "CurrentHand" : ""}`}>
                    {hand.map((card) => (
                      <Card card={card} />
                    ))}
                  </div>
                  <h1 className="d-flex justify-content-center mt-3">${bets[index]}</h1>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-3">
              <h4 className="fw-bold">Total:</h4>
              <h4 className="ms-1">${total}</h4>
              {state == GameState.Start && (
                <>
                  <h4 className="fw-bold ms-3">Bet:</h4>
                  <h4 className="ms-1">${initialBet}</h4>
                </>
              )}
            </div>

            <div className="Menu d-flex justify-content-center mt-3">
              {state == GameState.Start && (
                <div>
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" disabled={initialBet == 0} onClick={() => Deal()}>
                      Deal
                    </button>
                  </div>
                  <div className="mt-3 Chips">
                    <button type="button" className="TwentyFive" disabled={initialBet + 25 > total} onClick={() => Bet(25)}>
                      +25
                    </button>
                    <button type="button" className="Ten" disabled={initialBet + 10 > total} onClick={() => Bet(10)}>
                      +10
                    </button>
                    <button type="button" className="Five" disabled={initialBet + 5 > total} onClick={() => Bet(5)}>
                      +5
                    </button>
                    <button type="button" className="One" disabled={initialBet + 1 > total} onClick={() => Bet(1)}>
                      +1
                    </button>
                    <button type="button" onClick={() => Bet(0)}>
                      0
                    </button>
                    <button type="button" className="One" disabled={initialBet - 1 < 0} onClick={() => Bet(-1)}>
                      -1
                    </button>
                    <button type="button" className="Five" disabled={initialBet - 5 < 0} onClick={() => Bet(-5)}>
                      -5
                    </button>
                    <button type="button" className="Ten" disabled={initialBet - 10 < 0} onClick={() => Bet(-10)}>
                      -10
                    </button>
                    <button type="button" className="TwentyFive" disabled={initialBet - 25 < 0} onClick={() => Bet(-25)}>
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
                  <button type="button" className="btn btn-primary" disabled={bets[currentHand] > total || player[currentHand].length > 2} onClick={() => DoubleDown()}>
                    Double Down
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={!(player[currentHand].length == 2 && player[currentHand][0].value == player[currentHand][1].value)}
                    onClick={() => Split()}>
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
