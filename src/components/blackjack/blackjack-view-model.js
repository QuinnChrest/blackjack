import { Deck } from "../../models/deck";

export default function BlackjackViewModel({ GameState, GameAction, Deal, Bet, Hit, Split }) {
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

  var player = [],
    dealer = [],
    state = GameState.Start,
    bet = 25,
    total = 1000,
    action = GameAction.Stand;

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

  function GetCurrentHand() {
    return player.find((hand) => hand.current);
  }

  function Deal() {
    deck.pop();
    player = [{ cards: [deck[deck.length - 1], deck[deck.length - 3]], bet: bet, current: true }];
    dealer = [deck[deck.length - 2], deck[deck.length - 4]];
    deck.splice(deck.length - 4);

    if (CalculateHandTotal(playerHand).total == 21) {
      state = GameState.End;
      total = total - bet + bet * 2.5;
    } else {
      state = GameState.Playing;
      total -= bet;
    }
  }

  function Bet(amount) {
    bet = amount == 0 ? 0 : bet + amount;
  }

  function Hit() {
    let hand = GetCurrentHand();
    if (hand != null) {
      hand.push(deck.pop());
      if (CalculateHandTotal(hand).total > 21) {
        Bust();
      }
    }
    action = GetOptimalAction();
  }

  function DoubleDown() {
    let hand = GetCurrentHand();
    if (hand != null) {
      let index = player.findIndex((hand) => hand.current) + 1;
      hand.cards.push(deck.pop());
      hand.bet *= 2;
      total -= bet;
      IncrementHand();
    }
  }

  function Split() {
    let i = player.findIndex((hand) => hand.current);
    player.push({ cards: [player[i].cards.pop()], bet: bet });
    player[i].cards.push(deck.pop());
    total -= bet;
  }

  function Stand() {
    if (player.findIndex((hand) => hand.current) < player.length - 1) {
      IncrementHand();
    } else {
      let dealerHand = CalculateHandTotal(dealer);
      while ((dealerHand.total == 17 && dealerHand.aces > 0) || dealerHand.total < 17) {
        dealer.push(deck.pop());
        dealerHand = CalculateHandTotal(dealer);
      }

      Payout();
      state = GameState.End;
    }
  }

  function Payout() {
    let dealerHandTotal = CalculateHandTotal(dealer).total;
    for (const hand of player) {
      let playerHandTotal = CalculateHandTotal(hand.cards).total;

      if (playerHandTotal <= 21) {
        if (dealerHandTotal > 21 || playerHandTotal > dealerHandTotal) {
          total += hand.bet * 2;
        } else if (dealerHandTotal == playerHandTotal) {
          total += hand.bet;
        }
      }
    }
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
}
