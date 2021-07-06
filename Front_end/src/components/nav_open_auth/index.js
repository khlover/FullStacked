import "./index.css";
import { Link } from "react-router-dom";

export function NavAuth(props) {
  const logout = () => {
    props.updatekey(null);
  };

  return (
    <div>
      <div className="navMenu">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <p className="navMenuText">Home</p>
        </Link>

        <Link to="/addstack" style={{ textDecoration: "none" }}>
          <p className="navMenuText">Add a Post</p>
        </Link>

        <Link to="/mystack" style={{ textDecoration: "none" }}>
          <p className="navMenuText">My stack</p>
        </Link>
      </div>

      <button className="navButton" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default NavAuth;
