import { useState, useEffect, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import { HearthstoneClass } from "../Data/HearstoneData";
import ClassSelector from "./ClassSelector";
import DeckBuilder from "./DeckBuilder";
import Footer from "./Footer";
import CardDeckProvider from "./CardDeckProvider";
const { BlizzAPI } = require("blizzapi");

const api = new BlizzAPI({
  region: "eu",
  clientId: "8eda43e5500c4b638ea8b61e29f79f9a",
  clientSecret: "2nPEr2sOvvMZs7tB9zrSJ1Y61gnkf0YK",
});

function App() {
  const [playerClassId, setPlayerClassId] = useState(null);
  const [classSelection, setClassSelection] = useState(true);
  const [cards, setCards] = useState([]);
  const AnimatedClassSelector = animated(ClassSelector);

  const transition = useTransition(classSelection, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 1000,
    },
  });

  const selectClass = (id) => {
    setPlayerClassId(id);
    setClassSelection((state) => !state);
    setCards([]);
  };

  const getCards = useCallback(async () => {
    const { cards } = await api.query(
      `/hearthstone/cards?locale=en_US&set=standard&class=${HearthstoneClass[playerClassId]},neutral&collectible=1&gameMode=constructed&page=1&pageSize=400&sort=manaCost:asc`
    );
    setCards(cards);
  }, [playerClassId, setCards]);

  useEffect(() => {
    if (playerClassId) getCards();
  }, [playerClassId, getCards]);

  return (
    <div>
      {transition((styles, classSelection) =>
        classSelection ? (
          <div className="class-selection-page">
            <AnimatedClassSelector styles={styles} selectClass={selectClass} />
          </div>
        ) : (
          <div className="deck-builder-page">
            <div className="App">
              <CardDeckProvider>
                <DeckBuilder
                  cards={cards}
                  selectClass={setClassSelection}
                  playerClassId={playerClassId}
                />
              </CardDeckProvider>
            </div>
            <Footer />
          </div>
        )
      )}
    </div>
  );
}

export default App;
