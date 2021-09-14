import React, { useState, useContext } from "react";
import { CardDeckContext } from "./CardDeckProvider";
import { DeckInfoContext } from "./CardDeckProvider";
import CardRow from "./CardRow";
import { HearthstoneDispayClass } from "../Data/HearstoneData";
import CardDeckModal from "./CardDeckModal";
import { FaTrashAlt } from "react-icons/fa";

const { BlizzAPI } = require("blizzapi");

const api = new BlizzAPI({
  region: "eu",
  clientId: "8eda43e5500c4b638ea8b61e29f79f9a",
  clientSecret: "2nPEr2sOvvMZs7tB9zrSJ1Y61gnkf0YK",
});

const CardDeck = ({ playerClassId }) => {
  const [showModal, setshowModal] = useState(false);
  const { deck, removeCard, clearDeck } = useContext(CardDeckContext);
  const deckInfo = useContext(DeckInfoContext);

  const copyDeckCode = async () => {
    if (deckInfo.count !== 30 || showModal) {
      return;
    }

    let deckIds = "";
    deck.forEach((card) => {
      deckIds += `${card.id},`;
      if (deckInfo[card.id] === 2) deckIds += `${card.id},`;
    });

    const { deckCode } = await api.query(
      `/hearthstone/deck?locale=en_US&ids=${deckIds}`
    );
    await navigator.clipboard.writeText(deckCode);
    await setshowModal(true);
  };

  return (
    <div className="card-deck">
      <div className="deck-head">
        <div className="deck-head-border">
          <div className="clear-deck" onClick={() => clearDeck()}>
            <FaTrashAlt />
          </div>
          <p className="white-hs-text">
            {HearthstoneDispayClass[+playerClassId]} Deck
          </p>
          <span className="gold-hs-text"> {deckInfo.count} / 30</span>
        </div>
        <div
          className={
            "deck-head-content " +
            HearthstoneDispayClass[+playerClassId].replace(/ /g, "")
          }
        ></div>
      </div>

      <div className="deck-card-list">
        {deckInfo.count > 0 ? (
          <div className="actual-card-list">
            {deck.map((card) => (
              <CardRow
                card={card}
                key={card.id}
                removeCard={removeCard}
                quantity={deckInfo[card.id]}
              />
            ))}
          </div>
        ) : (
          <div className="empty-deck">
            <div className="empty-deck-mark"></div>
            <h6>Click cards to add them</h6>
          </div>
        )}
        {showModal && <CardDeckModal hideModal={setshowModal} />}
      </div>

      <div className="deck-footer">
        <button className="footer-btn" onClick={() => copyDeckCode()}>
          {deckInfo.count === 30
            ? "Copy Deck Code"
            : "Complete Full Deck To Copy It"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(CardDeck);
