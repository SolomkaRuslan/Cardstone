import { HearthstoneFilteredData, DisplayNames } from "../Data/HearstoneData";

const FilterButton = ({ keyName, value, changeFilter }) => {
  return (
    <button
      className="filter-btn"
      onClick={() => changeFilter({ key: keyName, value })}
    >
      {DisplayNames[keyName]}:{" "}
      {keyName === "manaCost" ? value : HearthstoneFilteredData[keyName][value]}
    </button>
  );
};

export default FilterButton;
