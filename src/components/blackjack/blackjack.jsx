import { useEffect, useState } from "react";
import { Deck } from "../../models/deck";
import Card from "../card/card";
import "./blackjack.css";

// LOOK INTO NVVM CODING PATTERNS

const GameState = Object.freeze({
  Start: 0,
  Insurance: 1,
  Playing: 2,
  End: 3,
});

const GameAction = Object.freeze({
  Hit: 0,
  Stand: 1,
  Double: 2,
  Split: 3,
});

// prettier-ignore
const CheatSheet = new Map([
  ["3",     new Map([["2", 0], ["3", 0], ["4", 0], ["5", 0], ["6", 0], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["4",     new Map([["2", 0], ["3", 0], ["4", 0], ["5", 0], ["6", 0], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["5",     new Map([["2", 0], ["3", 0], ["4", 0], ["5", 0], ["6", 0], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["6",     new Map([["2", 0], ["3", 0], ["4", 0], ["5", 0], ["6", 0], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["7",     new Map([["2", 0], ["3", 0], ["4", 0], ["5", 0], ["6", 0], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["8",     new Map([["2", 0], ["3", 0], ["4", 0], ["5", 0], ["6", 0], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["9",     new Map([["2", 0], ["3", 2], ["4", 2], ["5", 2], ["6", 2], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["10",    new Map([["2", 2], ["3", 2], ["4", 2], ["5", 2], ["6", 2], ["7", 2], ["8", 2], ["9", 2], ["10", 0], ["A", 0]])],
  ["11",    new Map([["2", 2], ["3", 2], ["4", 2], ["5", 2], ["6", 2], ["7", 2], ["8", 2], ["9", 2], ["10", 2], ["A", 2]])],
  ["12",    new Map([["2", 0], ["3", 0], ["4", 1], ["5", 1], ["6", 1], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["13",    new Map([["2", 1], ["3", 1], ["4", 1], ["5", 1], ["6", 1], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["14",    new Map([["2", 1], ["3", 1], ["4", 1], ["5", 1], ["6", 1], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["15",    new Map([["2", 1], ["3", 1], ["4", 1], ["5", 1], ["6", 1], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["16",    new Map([["2", 1], ["3", 1], ["4", 1], ["5", 1], ["6", 1], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["A-2",   new Map([["2", 0], ["3", 0], ["4", 2], ["5", 2], ["6", 2], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["A-3",   new Map([["2", 0], ["3", 0], ["4", 2], ["5", 2], ["6", 2], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["A-4",   new Map([["2", 0], ["3", 0], ["4", 2], ["5", 2], ["6", 2], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["A-5",   new Map([["2", 0], ["3", 0], ["4", 2], ["5", 2], ["6", 2], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["A-6",   new Map([["2", 0], ["3", 0], ["4", 2], ["5", 2], ["6", 2], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["A-7",   new Map([["2", 1], ["3", 2], ["4", 2], ["5", 2], ["6", 2], ["7", 1], ["8", 1], ["9", 0], ["10", 0], ["A", 0]])],
  ["2-2",   new Map([["2", 0], ["3", 0], ["4", 3], ["5", 3], ["6", 3], ["7", 3], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["3-3",   new Map([["2", 0], ["3", 0], ["4", 3], ["5", 3], ["6", 3], ["7", 3], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["4-4",   new Map([["2", 0], ["3", 0], ["4", 0], ["5", 0], ["6", 0], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["5-5",   new Map([["2", 2], ["3", 2], ["4", 2], ["5", 2], ["6", 2], ["7", 2], ["8", 2], ["9", 2], ["10", 0], ["A", 0]])],
  ["6-6",   new Map([["2", 3], ["3", 3], ["4", 3], ["5", 3], ["6", 3], ["7", 0], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["7-7",   new Map([["2", 3], ["3", 3], ["4", 3], ["5", 3], ["6", 3], ["7", 3], ["8", 0], ["9", 0], ["10", 0], ["A", 0]])],
  ["8-8",   new Map([["2", 3], ["3", 3], ["4", 3], ["5", 3], ["6", 3], ["7", 3], ["8", 3], ["9", 3], ["10", 3], ["A", 3]])],
  ["9-9",   new Map([["2", 3], ["3", 3], ["4", 3], ["5", 3], ["6", 3], ["7", 1], ["8", 3], ["9", 3], ["10", 1], ["A", 1]])],
  ["A-A",   new Map([["2", 3], ["3", 3], ["4", 3], ["5", 3], ["6", 3], ["7", 3], ["8", 3], ["9", 3], ["10", 3], ["A", 3]])],
]);

function Blackjack() {
  const [player, setPlayer] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [state, setState] = useState(GameState.Start);
  const [bet, setBet] = useState(10);
  const [total, setTotal] = useState(1000);
  const [action, setAction] = useState(GameAction.Stand);

  var deck = Deck.GetBlackJackDeck(6);

  useEffect(() => {
    let hand = player.find((hand) => hand.current)?.cards;
    if (hand != null && CalculateHandTotal(hand).total > 21) {
      Bust();
    }
    setAction(GetOptimalAction());
  }, [player]);

  useEffect(() => {
    if (state == GameState.Insurance) {
    } else if (state == GameState.End) {
      Payout();
    }
  }, [state]);

  function Deal() {
    deck.pop();

    let playerHand = [deck[deck.length - 1], deck[deck.length - 3]];
    let dealerHand = [deck[deck.length - 2], deck[deck.length - 4]];

    deck.splice(deck.length - 4);

    setPlayer([{ cards: playerHand, bet: bet, current: true }]);
    setDealer(dealerHand);

    console.log(dealerHand);

    if (CalculateHandTotal(playerHand).total == 21) {
      setState(GameState.End);
      setTotal(total - bet + bet * 2.5);
    } else {
      setState(GameState.Playing);
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
    let index = player.findIndex((hand) => hand.current) + 1;
    setPlayer(
      player.map((hand, i) =>
        hand.current ? { cards: [...hand.cards, deck.pop()], bet: hand.bet * 2, current: false } : i == index ? { ...hand, current: true, cards: [...hand.cards, deck.pop()] } : hand
      )
    );
    setTotal(total - bet);

    if (index > player.length - 1) {
      Stand(true);
    }
  }

  function Split() {
    let i = player.findIndex((hand) => hand.current);
    let playerHands = [...player];
    playerHands.push({ cards: [playerHands[i].cards.pop()], bet: bet });
    playerHands[i].cards.push(deck.pop());
    setTotal(total - bet);
    setPlayer(playerHands);
  }

  function Stand() {
    if (player.findIndex((hand) => hand.current) < player.length - 1) {
      IncrementHand();
    } else {
      let dealerHand = [...dealer];

      let hand = CalculateHandTotal(dealerHand);
      while ((hand.total == 17 && hand.aces > 0) || hand.total < 17) {
        dealerHand.push(deck.pop());
        hand = CalculateHandTotal(dealerHand);
      }

      setDealer(dealerHand);
      setState(GameState.End);
    }
  }

  function Payout() {
    let dealerHandTotal = CalculateHandTotal(dealer).total;
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
  }

  function IncrementHand() {
    let index = player.findIndex((hand) => hand.current) + 1;
    setPlayer(player.map((hand, i) => (hand.current ? { ...hand, current: false } : i == index ? { ...hand, current: true, cards: [...hand.cards, deck.pop()] } : hand)));
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

  function Insure(insured) {
    console.log(insured);
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

  function GetOptimalAction() {
    let hand = player.find((hand) => hand.current)?.cards;
    if (hand != null) {
      hand = [...hand];
      hand = hand.sort((a, b) => {
        if (a === "A") return -1;
        if (b === "A") return 1;
        return 0;
      });

      let handTotal = CalculateHandTotal(hand).total;

      let showing = ["J", "Q", "K"].includes(dealer[1].value) ? "10" : dealer[1].value;

      if (hand.length == 2 && CheatSheet.has(hand[0].value + "-" + hand[1].value)) {
        return CheatSheet.get(hand[0].value + "-" + hand[1].value).get(showing);
      } else if (CheatSheet.has(handTotal.toString())) {
        return CheatSheet.get(handTotal.toString()).get(showing);
      } else {
        return GameAction.Stand;
      }
    }
  }

  return (
    <div className="Table d-flex justify-content-center">
      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-center">
          <div>
            <div className="Hand d-flex">
              {dealer.map((card, index) => (
                <Card card={card} facedown={index == 0 && state == GameState.Playing} />
              ))}
            </div>
            <div>{GameState.End == state && <h1 className="d-flex justify-content-center mt-3">{CalculateHandTotal(dealer).total}</h1>}</div>
          </div>
        </div>

        {state == GameState.Insurance && <h1>Insurance?</h1>}

        <div className="d-flex justify-content-center">
          <div>
            <div className={player.length > 1 ? "d-flex flex-row-reverse" : "d-flex justify-content-center"}>
              {player.map((hand, index) => (
                <div className={index > 0 ? "me-5" : ""}>
                  <h1 className="d-flex justify-content-center mb-3">
                    {CalculateHandTotal(hand.cards).total}
                    {state == GameState.End && <> - {GetResultText(hand.cards)}</>}
                  </h1>
                  <div className={`Hand d-flex ${hand.current && player.length > 1 && state == GameState.Playing ? "CurrentHand" : ""}`}>
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

              {state == GameState.Insurance && (
                <>
                  <button type="button" className="btn btn-primary" onClick={() => Insure(true)}>
                    Yes
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => Insure(false)}>
                    No
                  </button>
                </>
              )}

              {state == GameState.Playing && (
                <>
                  <button type="button" className={`btn btn-primary ${action == GameAction.Hit ? "Recommended" : ""}`} onClick={() => Hit()}>
                    Hit
                  </button>
                  <button
                    type="button"
                    className={`btn btn-primary ${action == GameAction.Double ? "Recommended" : ""}`}
                    disabled={player.some((hand) => hand.current && (hand.bet > total || hand.cards.length > 2))}
                    onClick={() => DoubleDown()}>
                    Double Down
                  </button>
                  <button
                    type="button"
                    className={`btn btn-primary ${action == GameAction.Split ? "Recommended" : ""}`}
                    disabled={!player.some((hand) => hand.current && hand.cards[0].value == hand.cards[1].value)}
                    onClick={() => Split()}>
                    Split
                  </button>
                  <button type="button" className={`btn btn-primary ${action == GameAction.Stand ? "Recommended" : ""}`} onClick={() => Stand()}>
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
