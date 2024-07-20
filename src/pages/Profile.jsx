import React, { useEffect, useState } from "react";
import { getToken } from "../utils/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  const getUserProfile = async () => {
    const token = getToken();

    const res = await axios.get("http://127.0.0.1:8000/vendor/profile", {
      headers: {
        "Content-Type": "Application.json",
        Authorization: `Token ${token}`,
      },
    });
    const data = res.data;
    console.log("data", data);
    setProfileData(data.data);

    setVendorName(
      data.data.company_name ? data.data.company_name : data.data.name
    );
    setVendorPhone(data.data.company_phone);
    setWebsite(data.data.company_website);
    setAddress(data.data.company_address);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const navigate = useNavigate();

  const [vendorName, setVendorName] = useState(profileData?.company_name);
  const [vendorPhone, setVendorPhone] = useState(profileData?.company_phone);
  const [logo, setLogo] = useState("");
  const [website, setWebsite] = useState(profileData?.company_website);
  const [address, setAddress] = useState(profileData?.company_address);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendorName || !vendorPhone || !address) {
      alert("All field with * are required");
      return;
    }

    // Here you would typically send the vendor data to the server
    let formData = {
      company_name: vendorName,
      company_phone: vendorPhone,
      company_address: address,
      company_website: website,
      company_logo: logo,
    };
    formData["user_type"] = "Vendor";

    try {
      const tkn = getToken();
      const url = `http://localhost:8000/vendor/profile/update`;
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${tkn}`,
        },
      });
      const data = res.data;
      console.log("data", data);

      navigate(0);

      alert("Vendor updated successfully");
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  return (
    <div className="w-container">
      <h1 style={{ color: "white" }}>My Profile Page</h1>
      <div className="grider">
        <div className="mid-container m-l p-l">
          <div>
            <img
              src={`http://127.0.0.1:8000/${profileData.company_logo}`}
              alt=""
              style={{
                width: "100%",
                height: "200px",
                border: "1px solid black",
                padding: "5px",
                borderRadius: "10px",
              }}
            />
          </div>
          <br />
          My Data: <br />
          <p>
            <strong>Name:</strong>{" "}
            {profileData.company_name != ""
              ? profileData.company_name
              : profileData.name}
          </p>
          <p>
            <strong>Email:</strong> {profileData.company_email}
          </p>
          <p>
            <strong>Phone Number:</strong> {profileData.company_phone}
          </p>
          <br />
          Location: <br />
          <p>
            <strong>Address:</strong> {profileData.company_address}
          </p>
          <p>
            <strong>Website:</strong> {profileData.company_website}
          </p>
        </div>

        <div className="container ">
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "white",
              border: "1px solid white",
              padding: "30px",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            <h2 style={{ color: "black" }}>Update Profile</h2>
            <div className="flex-column">
              <label style={{ color: "black" }} htmlFor="vendorName">
                Name *
              </label>
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
              <label style={{ color: "black" }} htmlFor="logo">
                Logo
              </label>
              <input
                type="file"
                id="logo"
                name="logo"
                onChange={(e) => setLogo(e.target.files[0])}
              />
            </div>
            <div className="flex-column">
              <label style={{ color: "black" }} htmlFor="vendorPhone">
                Phone Number *
              </label>
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
              <label style={{ color: "black" }} htmlFor="website">
                Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="flex-column">
              <label style={{ color: "black" }} htmlFor="address">
                Address *
              </label>
              <textarea
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-button"
              style={{ backgroundColor: "#4CAF50", padding: "10px" }}
            >
              Update
            </button>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
