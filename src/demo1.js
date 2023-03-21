import React, { useState } from 'react';
import axios from 'axios';

function Formd1() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    emailAddress: '',




  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios.post('http://localhost:8000/create', formData)
    
      .then((response) => {
        console.log("response data ",response.data);
        this.callAPI();
      })
      .catch((error) => {
        console.error(error,"this is error");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>

      <label>
        Mobile No:
        <input
          type="text"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
        />
      </label>

      <label>
        Email Address:
        <input
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Formd1;
