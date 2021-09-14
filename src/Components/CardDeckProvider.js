import React, { useState, useCallback, useRef } from "react";

export const CardDeckContext = React.createContext();
export const SetCardDeckContext = React.createContext();
export const DeckInfoContext = React.createContext();

const getInsertIndex = (cost, deck) => {
  if (deck.length === 0) return 0;
  let index = 0;

  for (let i = 0; i < deck.length; i++) {
    if (deck[i].manaCost > cost) break;
    index++;
  }
  return index;
};

const CardDeckProvider = ({ children }) => {
  const [deckInfo, setDeckInfo] = useState(() => ({ count: 0 }));
  const [deck, setDeck] = useState([]);
  let stateRef = useRef({ count: 0 });

  const addCard = useCallback(
    (card) => {
      if (stateRef.current.count > 29)
        return "Your deck is full: you need to remove a card before you can add another";

      switch (stateRef.current[card.id]) {
        case undefined: {
          setDeckInfo((oldInfo) => {
            stateRef.current = {
              ...oldInfo,
              [card.id]: 1,
              count: oldInfo.count + 1,
            };
            return {
              ...oldInfo,
              [card.id]: 1,
              count: oldInfo.count + 1,
            };
          });

          setDeck((oldDeck) => {
            let newDeck = [...oldDeck];
            const index = getInsertIndex(card.manaCost, oldDeck);
            newDeck.splice(index, 0, card);
            return newDeck;
          });
          break;
        }
        case 1: {
          if (card.rarityId === 5)
            return "Your can only have one copies of this card in your deck";
          setDeckInfo((oldInfo) => {
            stateRef.current = {
              ...oldInfo,
              [card.id]: 2,
              count: oldInfo.count + 1,
            };

            return {
              ...oldInfo,
              [card.id]: 2,
              count: oldInfo.count + 1,
            };
          });
          break;
        }
        default: {
          return "Your can only have two copies of this card in your deck";
        }
      }
      return "";
    },
    [setDeck, setDeckInfo]
  );

  const removeCard = (card) => {
    if (stateRef.current.count < 1) return;
    switch (stateRef.current[card.id]) {
      case 2: {
        setDeckInfo((oldInfo) => {
          stateRef.current = {
            ...oldInfo,
            [card.id]: 1,
            count: oldInfo.count - 1,
          };

          return {
            ...oldInfo,
            [card.id]: 1,
            count: oldInfo.count - 1,
          };
        });
        break;
      }
      case 1: {
        setDeckInfo((oldInfo) => {
          const newInfo = { ...oldInfo, count: oldInfo.count - 1 };
          stateRef.current = { ...oldInfo, count: oldInfo.count - 1 };

          delete newInfo[card.id];
          delete stateRef.current[card.id];

          return newInfo;
        });
        setDeck((oldDeck) => oldDeck.filter((c) => c.id !== card.id));
        break;
      }
      default: {
        return;
      }
    }
  };

  const clearDeck = () => {
    setDeckInfo({ count: 0 });
    setDeck([]);
    stateRef.current = { count: 0 };
  };

  return (
    <CardDeckContext.Provider
      value={{ deck: deck, removeCard: removeCard, clearDeck: clearDeck }}
    >
      <DeckInfoContext.Provider value={deckInfo}>
        <SetCardDeckContext.Provider value={addCard}>
          {children}
        </SetCardDeckContext.Provider>
      </DeckInfoContext.Provider>
    </CardDeckContext.Provider>
  );
};

export default CardDeckProvider;
