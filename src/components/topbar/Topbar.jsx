import { Link } from "react-router-dom";
import "./topbar.scss";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { Logout } from "../../context/Actions";

function Topbar() {
  const { user, dispatch } = useContext(Context);
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topLeftIcon fa-brands fa-facebook"></i>
        <i className="topLeftIcon fa-brands fa-x-twitter"></i>
        <i className="topLeftIcon fa-brands fa-pinterest-p"></i>
        <i className="topLeftIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>
            <li className="topListItem">Home</li>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/about"}
          >
            <li className="topListItem">About</li>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/contact"}
          >
            <li className="topListItem">Contact</li>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/write"}
          >
            <li className="topListItem">Write</li>
          </Link>
          {user && (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/login"}
            >
              <li className="topListItem" onClick={() => dispatch(Logout())}>
                Logout
              </li>
            </Link>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to={'/settings'}>
            <img
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="topImg"
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to={"/login"}>
                Login
              </Link>
            </li>

            <li className="topListItem">
              <Link className="link" to={"/register"}>
                Register
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}

export default Topbar;
