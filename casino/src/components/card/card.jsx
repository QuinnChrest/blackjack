import "./card.css";

function Card({ card, facedown = false }) {
  return (
    <>
      {!facedown ? (
        <div className={"Card " + card.color}>
          <div className="Value">{card.value}</div>
          <div className="text-center">
            <i className={card.icon}></i>
          </div>
        </div>
      ) : (
        <div className="Card">
          <div className="FaceDown"></div>
        </div>
      )}
    </>
  );
}

export default Card;
