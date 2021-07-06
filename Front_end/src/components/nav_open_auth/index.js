import "./index.css";

export function NavAuth(props) {
  const logout = () => {
    props.updatekey(null);
  };

  return (
    <div>
      <div className="navMenu">
        <p className="navMenuText">Home</p>
        <p className="navMenuText">Add a Post</p>
        <p className="navMenuText">My stack</p>
      </div>

      <button className="navButton" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default NavAuth;
