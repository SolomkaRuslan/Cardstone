import { useEffect } from "react";

const DeckIsFull = ({ hideModal, text }) => {
  useEffect(() => {
    setTimeout(() => hideModal(""), 1500);
  }, [hideModal]);

  return (
    <div className="deck-is-full">
      <span>{text}</span>
    </div>
  );
};

export default DeckIsFull;
