import { animated } from "@react-spring/web";
import { useState } from "react";
import hearstoneClasses from "../Data/ClassSelectionData";
import ClassComponent from "./ClassComponent";

const ClassSelector = ({ styles, selectClass }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (id) => {
    setClicked(true);
    selectClass(id);
  };

  const emptyF = () => void 0;

  return (
    <animated.div style={styles} className="class-selector">
      <h1>Select Your Class</h1>
      <div className="class-collection">
        {hearstoneClasses.map((hsClass) => (
          <ClassComponent
            baseImg={hsClass.baseImg}
            hoverImg={hsClass.hoverImg}
            title={hsClass.title}
            key={hsClass.id}
            id={+hsClass.id}
            handleClick={!clicked ? handleClick : emptyF}
          />
        ))}
      </div>
    </animated.div>
  );
};

export default ClassSelector;
