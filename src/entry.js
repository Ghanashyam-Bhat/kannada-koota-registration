import './App.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import React, { useState,useEffect} from "react";

function Entry() {
  const history = useHistory();

  useEffect(()=>{
  
  axios.post("https://kannada-koota-tickets.vercel.app/auth/status/", {cookies:document.cookie},{     
      })
    .then((response) => {
      console.log(response);
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
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status
  const [submissionMessage, setSubmissionMessage] = useState(""); // State to display submission message

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
        
        // Handle the successful response

        console.log("Response:", response.data);
        history.replace('/login')

      })
      .catch((error) => {
        // Handle any errors
        console.error("Error sending POST request:", error);
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start the submission state
    setSubmissionMessage("");
    axios
      .post("https://kannada-koota-tickets.vercel.app/ticket/submit/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setFormData({
            name: "",
            universityId: "",
            email: "",
            contact: "",
            paymentMethod: "Online",
            cookies: document.cookie, // Default to "Cash"
          })
          setIsSubmitting(false); // Reset the submission state
          setSubmissionMessage("Data successfully submitted");
        
        // Handle the successful response

        console.log("Response:", response.data);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setSubmissionMessage("Error occured Please try again");
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
          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {submissionMessage && (
            <p>{submissionMessage} (This message will disappear when you start filling another response.)</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Entry;
