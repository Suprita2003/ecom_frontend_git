import React, { useState,useEffect } from "react";
import "./Adress.css";
import { useNavigate } from "react-router-dom";

const AddressForm = ({ onSubmit }) => {

// const navigate = useNavigate();
// const handleSubmit = () => {
//   navigate('/stepper', { state: { toastMessage: "Address successfully!" } });
// }
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <h3 className="form-header">Shipping Address</h3>

      <label className="form-label">Full Name</label>
      <input
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
        className="form-input"
        required
      />

      <label className="form-label">Address</label>
      <textarea
        name="address"
        placeholder="Enter your address"
        value={formData.address}
        onChange={handleChange}
        className="form-textarea"
        required
      ></textarea>

      <label className="form-label">City</label>
      <input
        type="text"
        name="city"
        placeholder="Enter your city"
        value={formData.city}
        onChange={handleChange}
        className="form-input"
        required
      />

      <label className="form-label">State</label>
      <input
        type="text"
        name="state"
        placeholder="Enter your state"
        value={formData.state}
        onChange={handleChange}
        className="form-input"
        required
      />

      <label className="form-label">Postal Code</label>
      <input
        type="text"
        name="postalCode"
        placeholder="Enter your postal code"
        value={formData.postalCode}
        onChange={handleChange}
        className="form-input"
        required
      />

      <label className="form-label">Phone Number</label>
      <input
        type="text"
        name="phoneNumber"
        placeholder="Enter your phone number"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="form-input"
        required
      />

      <button type="submit" className="form-button">
        Submit Address
      </button>
    </form>
  );
};

export default AddressForm;
