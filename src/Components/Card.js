import React, { useState, useContext } from "react";
import { SetCardDeckContext } from "./CardDeckProvider";
import DeckIsFull from "./DeckIsFull";

const areEqual = (prevProps, nextProps) => {
  return prevProps.card.id === nextProps.card.id;
};

const Card = ({ card, openModal }) => {
  const [modalMessage, setModalMessage] = useState("");
  const addCard = useContext(SetCardDeckContext);

  const handleMove = (e) => {
    const el = e.target.closest(".card");
    const height = el.clientHeight;
    const width = el.clientWidth;
    const xVal = e.clientX - el.getBoundingClientRect().x;
    const yVal = e.clientY - el.getBoundingClientRect().y;
    const yRotation = 20 * ((xVal - width / 2) / width);
    const xRotation = -20 * ((yVal - height / 2) / height);
    const string =
      "perspective(500px) scale(1.1) rotateX(" +
      xRotation +
      "deg) rotateY(" +
      yRotation +
      "deg)";
    el.style.transform = string;
  };

  const handleOut = (e) => {
    e.target.closest(".card").style.transform =
      "perspective(500px) scale(1) rotateX(0) rotateY(0)";
  };

  const handleClick = (card) => {
    const mes = addCard(card);
    if (mes.length === 0 || modalMessage.length !== 0) return;
    setModalMessage(mes);
  };

  return (
    <div
      className="card"
      onMouseMove={(e) => handleMove(e)}
      onMouseOut={(e) => {
        handleOut(e);
      }}
    >
      <img
        src={card.image}
        alt={`${card.name}`}
        onClick={() => handleClick(card)}
      />
      <button className="info-btn" onClick={() => openModal(card)}></button>
      {modalMessage && (
        <DeckIsFull hideModal={setModalMessage} text={modalMessage} />
      )}
    </div>
  );
};

export default React.memo(Card, areEqual);
