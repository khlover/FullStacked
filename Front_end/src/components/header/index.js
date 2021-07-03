import { useHistory, useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";

export function Header(props) {
  //Swaps menu and close icon
  let img = "";
  let history = useHistory();
  let match = useRouteMatch({ path: "/nav" });
  match ? (img = "assets/close.png") : (img = "assets/menu.png");

  const logout = () => {
    localStorage.setItem("auth", "");
    localStorage.setItem("authkey", "");
  };

  const modechange = () => {
    if (match) {
      history.goBack();
    }
  };

  return (
    <div className="Nav">
      <div className="Dnav">
        <span className="logo">
          <img
            id="logo"
            src="assets/Logo.png"
            alt="Company logo"
            width="36px"
            height="36px"
          />
          <p className="logoTitle">Stacked</p>
        </span>

        <div className="DnavMenu">
          <Link to="/home">
            <p className="DnavMenuText">Home</p>
          </Link>
          <p>About</p>
          <Link to="/addstack">
            <p className={props.auth ? "DnavMenuText" : "hidden"}>Add Post</p>
          </Link>
          <Link to="/mystack">
            <p className={props.auth ? "DnavMenuText" : "hidden"}>My Stack</p>
          </Link>
          <Link to="/login">
            <button className={!props.auth ? "DnavButton" : "hidden"}>
              Get Started
            </button>
          </Link>
          <Link to="/home">
            <button
              className={props.auth ? "DnavButton" : "hidden"}
              onClick={logout}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>

      <header className="Nav-header">
        <img
          src="assets/Logo.png"
          alt="Company logo"
          width="32px"
          height="32px"
        />
        <Link to={"/nav"}>
          <img
            id="menu"
            src={img}
            alt="Menu button"
            width="22px"
            height="22px"
            onClick={modechange}
          />
        </Link>
      </header>
    </div>
  );
}

export default Header;
