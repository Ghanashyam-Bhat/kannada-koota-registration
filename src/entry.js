import './App.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import React, { useState,useEffect} from "react";
import { toast } from "react-toastify";

function Entry() {
  const history = useHistory();

  useEffect(()=>{
  
  axios.post("https://kannada-koota-tickets.vercel.app/auth/status/", {cookies:document.cookie},{     
      })
    .then((response) => {
        toast.success("Login successfully!");
    })
    .catch((error) => {
      history.replace('/login');
    });
  },[]);


  const [formData, setFormData] = useState({
    name: "",
    universityId: "",
    email: "",
    contact: "",
    paymentMethod: "Online", 
    cookies: document.cookie,// Default to "Cash"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLogout=()=>{
    axios
      .post("https://kannada-koota-tickets.vercel.app/auth/logout/",{cookies:document.cookie},  {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("logged Successfully! hope you didnt make any mistakes");
        
        // Handle the successful response

        console.log("Response:", response.data);
        history.replace('/login')

      })
      .catch((error) => {
        toast.error("Try again!!")
        // Handle any errors
        console.error("Error sending POST request:", error);
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // const jsonData = JSON.stringify(formData);

    // Send a POST request with JSON data using Axios
    axios
      .post("https://kannada-koota-tickets.vercel.app/ticket/submit/", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Form submitted successfully!");
        setFormData({
            name: "",
            universityId: "",
            email: "",
            contact: "",
            paymentMethod: "Online",
            cookies: document.cookie, // Default to "Cash"
          })
        
        // Handle the successful response

        console.log("Response:", response.data);
      })
      .catch((error) => {
        toast.error("Try again!!")
        // Handle any errors
        console.error("Error sending POST request:", error);
      });

    // You can access the collected data in formData and perform actions (e.g., submit to a server) here.
  };

  return (
    <div>
    <button className="logout-button" onClick={handleLogout}>
  Logout
</button>

      <h2>ಕನ್ನಡ ಕೂಟ</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name"
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="universityId"
              value={formData.universityId}
              onChange={handleChange}
              required
              placeholder="University ID"
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="Contact"
            />
          </div>
          <div className="form-control">
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="Online">Online</option>

              <option value="Cash">Cash</option>
            </select>
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Entry;
