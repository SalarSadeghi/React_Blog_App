import { Link } from "react-router-dom";
import "./login.scss";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import { LoginFailure, LoginStart, LoginSuccess } from "../../context/Actions";
import axios from "axios";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginStart());
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      if (res.status === 200) {
        dispatch(LoginSuccess(res.data.user));
      }
    } catch (error) {
      dispatch(LoginFailure());
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          ref={emailRef}
          required
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
          required
        />
        <button type="submit" className="loginBtn" disabled={isFetching}>
          Login
        </button>
      </form>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={"/register"}
      >
        <button className="loginRegisterBtn">Register</button>
      </Link>
    </div>
  );
}

export default Login;
