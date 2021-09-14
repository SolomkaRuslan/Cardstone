const CardRow = ({ card, removeCard, quantity }) => {
  const countNumber = card.rarityId === 5 ? "⋆" : quantity === 2 ? "2" : "";

  return (
      <div className="card-row" onClick={() => removeCard(card)}>
        <span className="card-row-cost">{card.manaCost}</span>
        <span className="card-row-name">{card.name}</span>
        <div className="card-row-fill"></div>
        <div className="card-row-fade"></div>
        <div
          className="card-row-image"
          style={{ backgroundImage: `url("${card.cropImage}")` }}
        ></div>
        <span className="card-row-count">{countNumber}</span>
      </div>

  );
};

export default CardRow;
