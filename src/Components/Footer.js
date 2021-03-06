const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <p>Created with React:</p>
          <p>Hearthstone API used for this project:</p>
          <p>Official Hearthstone web-site</p>
          <p>
            <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>
          </p>
        </div>
        <div className="footer-row">
          <p>solomkaruslan3@gmail.com</p>
          <a href="https://develop.battle.net/documentation/hearthstone">
            https://develop.battle.net/documentation/hearthstone
          </a>
          <a href="https://playhearthstone.com/en-us/deckbuilder">
            https://playhearthstone.com/en-us/deckbuilder
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
