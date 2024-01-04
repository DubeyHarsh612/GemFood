import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const creds = useRef({ Email: "", location: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: creds.current.Email.value,
        Password: creds.current.Password.value,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      let errror = json.errors;
      console.log(errror);
      alert(errror || "Enter valid credentials");
    }
    if (json.success) {
      const userEmail = creds.current.Email.value;
      console.log("User email before storage:", userEmail);
      localStorage.setItem("userEmail", userEmail);
      console.log(
        "User email after storage:",
        localStorage.getItem("userEmail")
      );

      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }

    // Handle the response as needed
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            ref={(input) => (creds.current.Email = input)}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            ref={(input) => (creds.current.Password = input)}
          />
        </div>

        <button type="submit" className="btn btn-success m-3">
          Login
        </button>
        <Link className="btn btn-primary m-3" to="/createuser">
          New User?
        </Link>
      </form>
    </div>
  );
};

export default Login;
