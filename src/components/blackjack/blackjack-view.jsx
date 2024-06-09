import { useState } from "react";
import Card from "../card/card";
import "./blackjack.css";
import BlackjackViewModel from "./blackjack-view-model";

// LOOK INTO NVVM CODING PATTERNS

function Blackjack() {
  const [state, setState] = useState({
    Player: [],
    Dealer: [],
    Bet: 0,
    Total: 0,
    GameState: BlackjackViewModel.GameState.Start,
    GameAction: BlackjackViewModel.GameAction.Stand
  });

  const viewModel = new BlackjackViewModel();

  const Deal = function () {
    setState(viewModel.Deal());
  }

  const Bet = function (bet) {
    setState(viewModel.Bet(bet));
  }

  const Hit = function () {
    setState(viewModel.Hit());
  }

  const DoubleDown = function () {
    setState(viewModel.DoubleDown());
  }

  const Split = function () {
    setState(viewModel.Split());
  }
  
  const Stand = function () {
    setState(viewModel.Stand());
  }

  return (
    <div className="Table d-flex justify-content-center">
      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-center">
          <div>
            <div className="Hand d-flex">
              {state.Dealer.map((card, index) => (
                <Card card={card} facedown={index == 0 && state.GameState == GameState.Playing} />
              ))}
            </div>
            <div>{GameState.End == state.GameState && <h1 className="d-flex justify-content-center mt-3">{viewModel.CalculateHandTotal(state.Dealer).total}</h1>}</div>
          </div>
        </div>

        {state.GameState == GameState.Insurance && <h1>Insurance?</h1>}

        <div className="d-flex justify-content-center">
          <div>
            <div className={player.length > 1 ? "d-flex flex-row-reverse" : "d-flex justify-content-center"}>
              {state.Player.map((hand, index) => (
                <div className={index > 0 ? "me-5" : ""}>
                  <h1 className="d-flex justify-content-center mb-3">
                    {viewModel.CalculateHandTotal(hand.cards).total}
                    {state == GameState.End && <> - {viewModel.GetResultText(hand.cards)}</>}
                  </h1>
                  <div className={`Hand d-flex ${hand.current && state.Player.length > 1 && state.GameState == GameState.Playing ? "CurrentHand" : ""}`}>
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
              <h4 className="ms-1">${state.Total}</h4>
              {state.GameState == GameState.Start && (
                <>
                  <h4 className="fw-bold ms-3">Bet:</h4>
                  <h4 className="ms-1">${state.Bet}</h4>
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
