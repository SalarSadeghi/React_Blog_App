import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: "",
    passwordAgain: "",
    error: false,
  });
  const handleUserInputs = (e) => {
    const { name, value } = e.target;
    setUserInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserInputs(prev=>({...prev,error:false}))
    if (userInputs.password !== userInputs.passwordAgain) {
      e.target.password.setCustomValidity("Password does not match");
    } else {
      const user = {
        username: userInputs.username,
        email: userInputs.email,
        password: userInputs.password,
      };
      try {
        const res = await axios.post('http://localhost:3001/register',user)
        if(res.status === 201){
          window.location.replace('/login')
        }
      } catch (error) {
        setUserInputs(prev=>({...prev,error:true}))
      }
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          name="username"
          required
          placeholder="Enter your username..."
          onChange={handleUserInputs}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          name="email"
          required
          placeholder="Enter your email..."
          onChange={handleUserInputs}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="text"
          name="password"
          required
          placeholder="Enter your password..."
          onChange={handleUserInputs}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="text"
          name="passwordAgain"
          required
          placeholder="Enter your password again..."
          onChange={handleUserInputs}
        />
        <button type="submit" className="registerBtn">
          Register
        </button>
      </form>
      <Link style={{ textDecoration: "none", color: "inherit" }} to={"/login"}>
        <button className="registerLoginBtn">Login</button>
      </Link>
      {userInputs.error && <span style={{color:"red",marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}

export default Register;
