import { useEffect } from "react";

const CardDeckModal = ({ hideModal }) => {
  useEffect(() => {
    setTimeout(() => hideModal(false), 3000);
  }, [hideModal]);

  return (
    <div className="card-deck-modal">
      Deck code was coppied to your clipboard
    </div>
  );
};

export default CardDeckModal;
