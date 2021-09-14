import { useState } from "react";
import ManaRadioGroup from "./ManaRadioGroup";
import DropDownFilter from "./DropDownFilter";
import {
  HearthstoneRarity,
  HearthstoneType,
  HearthstoneStandartCardSet,
  HearthstoneMinionType,
  HearthstoneSpellSchool,
  HearthstoneClass,
} from "../Data/HearstoneData";
import { IoOptions } from "react-icons/io5";

const CardFilterPanel = ({
  changeFilter,
  toggleClassCards,
  filter,
  selectClass,
  playerClassId,
}) => {
  const [showExpanded, setShowExpanded] = useState(false);

  return (
    <div className="card-filter-panel">
      <div className="filter-panel-content">
        <div className="red-outline">
          <div
            className="select-wrapper panel-btn select-wrapper-class"
            onClick={() => selectClass(true)}
          >
            <div className="class-icon"></div>
            Class Selection
          </div>
        </div>

        <div className="row">
          <div className="toggle-group">
            <div className="class-toggle-btn">
              <div
                className={`toggle-btn-circle ${HearthstoneClass[playerClassId]}-round`}
                onClick={() => toggleClassCards()}
              ></div>
              {filter.classId === playerClassId ? (
                <div className="toggle-btn-border"></div>
              ) : (
                ""
              )}
            </div>

            <div className="class-toggle-btn go-left">
              <div
                className="toggle-btn-circle"
                onClick={() => toggleClassCards()}
              ></div>
              {filter.classId === 12 ? (
                <div className="toggle-btn-border"></div>
              ) : (
                ""
              )}
            </div>
          </div>

          <ManaRadioGroup
            handleChange={changeFilter}
            manaCount={10}
            selected={filter["manaCost"]}
          />
        </div>

        <div className="red-outline">
          <div
            className={
              showExpanded
                ? "select-wrapper panel-btn filters exp"
                : "select-wrapper panel-btn filters"
            }
            onClick={() => setShowExpanded((show) => !show)}
          >
            <IoOptions />
            Filters
          </div>
        </div>
        {filter.manaCost !== undefined &&
        Object.keys(filter).length - 2 !== 0 ? (
          <div className="filters-count">{Object.keys(filter).length - 2}</div>
        ) : Object.keys(filter).length - 1 !== 0 &&
          filter.manaCost === undefined ? (
          <div className="filters-count">{Object.keys(filter).length - 1}</div>
        ) : (
          ""
        )}
      </div>

      {showExpanded && (
        <div className="open-panel">
          <div className="filter-panel-content jc-center">
            <DropDownFilter
              options={HearthstoneRarity}
              handleChange={changeFilter}
              property="rarityId"
              value={filter["rarityId"]}
              title="Rarity"
            />

            <DropDownFilter
              options={HearthstoneType}
              handleChange={changeFilter}
              property="cardTypeId"
              value={filter["cardTypeId"]}
              title="Type"
            />

            <DropDownFilter
              options={HearthstoneStandartCardSet}
              handleChange={changeFilter}
              property="cardSetId"
              value={filter["cardSetId"]}
              title="Card Set"
            />

            <DropDownFilter
              options={HearthstoneMinionType}
              handleChange={changeFilter}
              property="minionTypeId"
              value={filter["minionTypeId"]}
              title="Minion Type"
            />

            <DropDownFilter
              options={HearthstoneSpellSchool}
              handleChange={changeFilter}
              property="spellSchoolId"
              value={filter["spellSchoolId"]}
              title="Spell School"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardFilterPanel;
