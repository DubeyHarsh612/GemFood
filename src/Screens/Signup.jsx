import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const creds = useRef({ name: "", Email: "", location: "", Password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: creds.current.name.value,
        Email: creds.current.Email.value,
        Password: creds.current.Password.value,
        location: creds.current.location.value,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      await navigate("/login");
      alert("Account successfully created");
    }

    // Handle the response as needed
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            ref={(input) => (creds.current.name = input)}
          />
        </div>

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
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            ref={(input) => (creds.current.location = input)}
          />
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
          Submit
        </button>
        <Link className="btn btn-primary m-3" to="/login">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Signup;
