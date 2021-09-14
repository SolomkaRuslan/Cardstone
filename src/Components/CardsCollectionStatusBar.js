import FilterButton from "./FilterButton";

const CardsCollectionStatusBar = ({
  filter,
  cardsCount,
  changeFilter,
  clearFilter,
}) => {
  const btnClasses =
    Object.keys(filter).length > 1 ? "filter-btn" : "filter-btn hidden";

  return (
    <div className="status-bar">
      <div className="status-bar-filters">
        <span>Found {cardsCount} Cards:</span>
        {Object.keys(filter).map((keyName) =>
          keyName !== "classId" ? (
            <FilterButton
              keyName={keyName}
              value={filter[keyName]}
              key={keyName}
              changeFilter={changeFilter}
            />
          ) : (
            ""
          )
        )}
      </div>
      <button className={btnClasses} onClick={() => clearFilter()}>
        Clear Filters
      </button>
    </div>
  );
};

export default CardsCollectionStatusBar;
