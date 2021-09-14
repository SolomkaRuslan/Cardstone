import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";

const DropDownFilter = ({ title, value, options, handleChange, property }) => {
  const [open, setOpen] = useState(() => false);

  const handleOptionClick = (option) => {
    setOpen(false);
    handleChange({ key: property, value: option });
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setOpen(false);
      }}
    >
      <div className="drop-down-filter">
        <div className="red-outline">
          <div className="select-wrapper" onClick={() => setOpen(!open)}>
            <div className="drop-down">
              {value ? options[value] : title}
              <FaAngleDown />
            </div>
          </div>
        </div>
        {open && (
          <div className="drop-down-options">
            {Object.keys(options).map((optionKey, i) => {
              const classes =
                i === 0 && !value
                  ? "option selected"
                  : +optionKey === value
                  ? "option selected"
                  : "option";
              return (
                <p
                  className={classes}
                  onClick={() => handleOptionClick(i > 0 ? +optionKey : "")}
                  key={optionKey}
                >
                  {options[optionKey] + " "}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default DropDownFilter;
