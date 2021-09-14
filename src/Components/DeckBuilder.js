import { useState } from "react";
import CardsCollection from "./CardsCollection";
import CardFilterPanel from "./CardFilterPanel";
import CardDeck from "./CardDeck";

const DeckBuilder = ({ cards, selectClass, playerClassId }) => {
  const [filter, setFilter] = useState({ classId: playerClassId });

  const filterCards = (cards) => {
    if (!cards) return;
    return cards.filter((card) => {
      let good = true;
      Object.keys(filter).forEach((key) => {
        if (card[key] !== filter[key]) good = false;
        if (
          !good &&
          key === "classId" &&
          card.multiClassIds.includes(+filter[key])
        )
          good = true;
        if (key === "cost" && filter[key] === 10 && card[key] > 10) good = true;
      });
      return good;
    });
  };

  const changeFilter = (changes) => {
    if (filter[changes.key] === changes.value || changes.value === "") {
      const newFilter = { ...filter };
      delete newFilter[changes.key];
      setFilter(newFilter);
    } else {
      const newFilter = { ...filter };
      newFilter[changes.key] = changes.value;
      setFilter(newFilter);
    }
  };

  const clearFilter = () => {
    setFilter({ classId: filter["classId"] });
  };

  const toggleClassCards = () => {
    filter.classId === 12
      ? changeFilter({ key: "classId", value: playerClassId })
      : changeFilter({ key: "classId", value: 12 });
  };

  return (
    <>
      <CardFilterPanel
        changeFilter={changeFilter}
        filter={filter}
        selectClass={selectClass}
        toggleClassCards={toggleClassCards}
        playerClassId={playerClassId}
      />
      <div className="deck-builder">
        {cards.length > 0 ? (
          <CardsCollection
            filter={filter}
            changeFilter={changeFilter}
            clearFilter={clearFilter}
            cards={filterCards(cards)}
          />
        ) : (
          <div className="placeholder">Loading Cards...</div>
        )}
        <div className="card-deck-holder">
          <CardDeck playerClassId={playerClassId} />
        </div>
      </div>
    </>
  );
};

export default DeckBuilder;
