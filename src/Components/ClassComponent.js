const ClassComponent = ({ baseImg, hoverImg, title, id, handleClick }) => {
  return (
    <div
      className="class"
      style={{
        background: `url(${baseImg}) center center / contain no-repeat`,
      }}
      onClick={() => handleClick(id)}
    >
      <div
        className="class-holder"
        style={{
          background: `url(${hoverImg}) center center / contain no-repeat`,
        }}
      >
        <h5>{title}</h5>
      </div>
    </div>
  );
};

export default ClassComponent;
