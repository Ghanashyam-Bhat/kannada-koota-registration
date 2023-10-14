import './App.css';
import axios from 'axios';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(formData);

    // Send a POST request with JSON data using Axios
    axios
      .post("/tickets/login/", jsonData, {
        withCredentials:true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("login success... kindly handle data with care!!!");
        history.push("/entry");
        // Handle the successful response

        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle any errors
        toast.error("Try again!!")
        setFormData({
            email: "",
            password: "",
          })
        console.error("Error sending POST request:", error);
      });

    // You can access the collected data in formData and perform actions (e.g., submit to a server) here.
    console.log(formData);
  };
  return (
    <div>
    <h2 >ಕನ್ನಡ ಕೂಟ</h2>
    <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />
      </div>
      <div className="form-control">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
        />
      </div>
      <button className="btn" type="submit">Login</button>
    </form>
    </div>
    </div>
);
}


export default Login;
