import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !vendorName ||
      !vendorEmail ||
      !vendorPhone ||
      !password ||
      !cpassword ||
      !address
    ) {
      alert("All field are required");
      return;
    }

    if (password != cpassword) {
      alert("Passwords do not match");
      return;
    }
    // Here you would typically send the vendor data to the server
    let formData = {
      name: vendorName,
      phone_number: vendorPhone,
      email: vendorEmail,
      address: address,
      password: password,
    };
    formData["user_type"] = "Vendor";

    try {
      const url = `http://localhost:8000/auth/register`;
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      console.log("data", data);

      // Clear form fields
      setVendorName("");
      setVendorEmail("");
      setVendorPhone("");
      navigate("/login", { replace: true });

      alert("Vendor added successfully");
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  return (
    <div className="applications-container ">
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid black",
          padding: "30px",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        <h2>Add Vendor</h2>
        <div className="flex-column">
          <label htmlFor="vendorName">Name *</label>
          <input
            type="text"
            id="vendorName"
            name="vendorName"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            required
          />
        </div>
        <div className="flex-column">
          <label htmlFor="vendorEmail">Email *</label>
          <input
            type="email"
            id="vendorEmail"
            name="vendorEmail"
            value={vendorEmail}
            onChange={(e) => setVendorEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex-column">
          <label htmlFor="vendorPhone">Phone Number *</label>
          <input
            type="text"
            id="vendorPhone"
            name="vendorPhone"
            value={vendorPhone}
            onChange={(e) => setVendorPhone(e.target.value)}
            required
          />
        </div>
        <div className="flex-column">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          >
            Enter Address
          </textarea>
        </div>
        <div className="flex-column">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex-column">
          <label htmlFor="cpassword">Confirm Password *</label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            value={cpassword}
            onChange={(e) => setcPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="submit-button"
          style={{ backgroundColor: "#4CAF50", padding: "10px" }}
        >
          Sign Up
        </button>
        <br /> <br />
        Have an Acount?{" "}
        <Link to="/login" className="back-link">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Registration;
