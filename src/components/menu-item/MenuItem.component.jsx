import { withRouter } from "react-router-dom";
import "./MenuItem.styles.scss";

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`menu-item ${size}`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
    onKeyUp={(e) =>
      (e.key === "Enter" || e.key === "NumpadEnter") &&
      history.push(`${match.url}${linkUrl}`)
    }
    role="navigation"
    tabIndex="0"
  >
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className="content">
      <div className="title">{title}</div>
      <span className="subtitle">SHOP NOW</span>
      <img src alt="" />
    </div>
  </div>
);

export default withRouter(MenuItem);
