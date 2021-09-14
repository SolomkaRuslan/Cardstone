import React, { useState, useRef } from "react";
import CardsCollectionStatusBar from "./CardsCollectionStatusBar";
import Card from "./Card";
import BasicDivider from "./BasicDivider";
import Modal from "react-modal";
import { HearthstoneFilteredData } from "../Data/HearstoneData";
import { MdClose } from "react-icons/md";

const customStyles = {
  content: {
    width: "100%",
    maxWidth: "800px",
    height: "600px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    color: "white",
    zIndex: "7",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.9)",
    zIndex: "6",
  },
};

Modal.setAppElement("#root");

const CardsCollection = ({ cards, filter, changeFilter, clearFilter }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalCardRef = useRef({ multiClassIds: [] });

  const handleShowModal = (card) => {
    modalCardRef.current = card;
    setModalIsOpen(true);
  };

  return (
    <div className="main-cards-content">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="card-modal">
          <div className="close-modal" onClick={() => setModalIsOpen(false)}>
            <MdClose />
          </div>
          <img
            src={modalCardRef.current.image}
            alt={`${modalCardRef.current.name}`}
            className="modal-img"
          />
          <div className="modal-text">
            <div className="modal-head">
              <p className="modal-name">{modalCardRef.current.name}</p>
              <p className="modal-flavour gray">
                {modalCardRef.current.flavorText}
              </p>
              <p
                className="modal-text-card"
                dangerouslySetInnerHTML={{ __html: modalCardRef.current.text }}
              ></p>
            </div>
            <div className="modal-body">
              <ul>
                <li>
                  Class:
                  <span className="gb">
                    {modalCardRef.current.multiClassIds.length > 0
                      ? `${
                          HearthstoneFilteredData.classId[
                            modalCardRef.current.multiClassIds[0]
                          ]
                        }, ${
                          HearthstoneFilteredData.classId[
                            modalCardRef.current.multiClassIds[1]
                          ]
                        }`
                      : HearthstoneFilteredData.classId[
                          modalCardRef.current.classId
                        ]}
                  </span>
                </li>
                <li>
                  Rarity:
                  <span className="gb">
                    {
                      HearthstoneFilteredData.rarityId[
                        modalCardRef.current.rarityId
                      ]
                    }
                  </span>
                </li>
                <li>
                  Type:
                  <span className="gb">
                    {
                      HearthstoneFilteredData.cardTypeId[
                        modalCardRef.current.cardTypeId
                      ]
                    }
                  </span>
                </li>
                {modalCardRef.current.minionTypeId && (
                  <li>
                    Minion type:
                    <span className="gb">
                      {
                        HearthstoneFilteredData.minionTypeId[
                          modalCardRef.current.minionTypeId
                        ]
                      }
                    </span>
                  </li>
                )}
                {modalCardRef.current.spellSchoolId && (
                  <li>
                    Spell school:
                    <span className="gb">
                      {
                        HearthstoneFilteredData.spellSchoolId[
                          modalCardRef.current.spellSchoolId
                        ]
                      }
                    </span>
                  </li>
                )}

                <li>
                  Set:
                  <span className="gb">
                    {
                      HearthstoneFilteredData.cardSetId[
                        modalCardRef.current.cardSetId
                      ]
                    }
                  </span>
                </li>
                <li>
                  Artist:
                  <span className="gb">{modalCardRef.current.artistName}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>

      <CardsCollectionStatusBar
        filter={filter}
        cardsCount={cards.length}
        changeFilter={changeFilter}
        clearFilter={clearFilter}
      />
      <BasicDivider />
      <div className="cards-collection">
        {cards.length > 0
          ? cards.map((card) => (
              <Card card={card} key={card.id} openModal={handleShowModal} />
            ))
          : "No cards that fit selected filters, try removing some"}
        <div className="ghost-card"></div>
        <div className="ghost-card"></div>
        <div className="ghost-card"></div>
        <div className="ghost-card"></div>
        <div className="ghost-card"></div>
      </div>
    </div>
  );
};

export default CardsCollection;

// function areEqual(prevProps, nextProps) {
//   let equal = true;
//   for (let i = 0; i < prevProps.length; i++) {
//     console.log(prevProps[i].cardId + " === " + nextProps[i].cardId);

//     if (prevProps[i].cardId !== nextProps[i].cardId) {
//       equal = false;
//       break;
//     }
//   }
//   return equal;
// }
