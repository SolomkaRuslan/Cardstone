const ManaRadioGroup = ({ handleChange, selected, manaCount }) => {
  return (
    <div className="red-outline">
      <div className="golden-outline">
        <div className="manaBar-container">
          {(function (count) {
            let arr = [];
            for (let i = 0; i <= count; i++) {
              let classes = selected === i ? "active mana-btn" : "mana-btn";
              arr.push(
                <button
                  className={classes}
                  onClick={(e) =>
                    handleChange({
                      key: "manaCost",
                      value: +e.target.closest("button").value,
                    })
                  }
                  value={i}
                  key={i}
                >
                  <span value={i}>{i}</span>
                </button>
              );
            }
            return arr;
          })(manaCount)}
        </div>
      </div>
    </div>
  );
};

export default ManaRadioGroup;
