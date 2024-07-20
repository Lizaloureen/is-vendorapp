import React, { useEffect, useState } from "react";
import { getToken, getUser } from "../utils/helpers";
import fa_types from "../utils/firearmsTypes";
import FireTable from "../components/FireTable";
import axios from "axios";
import { Link } from "react-router-dom";

const firearmsDataInitial = [
  { id: 1, name: "AR-15", type: "Rifle", caliber: ".223" },
  { id: 2, name: "Glock 19", type: "Handgun", caliber: "9mm" },
  { id: 3, name: "Remington 870", type: "Shotgun", caliber: "12 gauge" },
  // Add more firearms as needed
];

const Home = () => {
  const user = getUser();
  const [firearmsData, setFirearmsData] = useState([]);
  const [firearmsCount, setFirearmsCount] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const getFirearms = async () => {
    try {
      const token = getToken();

      const res = await axios.get("http://localhost:8000/vendor/firearms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      const data = res.data;
      setFirearmsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFirearmsCount = async () => {
    try {
      const token = getToken();

      const res = await axios.get(
        "http://localhost:8000/vendor/firearms/count",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = res.data;
      setFirearmsCount(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFirearms();
    getFirearmsCount();
  }, []);

  const handleSearchChange = async (e) => {
    e.preventDefault();
    let searchTerm = e.target.value;
    setFirearmsData(searchTerm);

    try {
      const token = getToken();

      const res = await axios.get(
        `http://localhost:8000/vendor/firearms?type=${searchTerm}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = res.data;
      setFirearmsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 style={{ color: "white" }}>Welcome {user.email}</h3>

      <div className="grider">
        <div className="card">
          <div className="card-body">
            <div className="title">{firearmsCount?.total}</div>
            <div className="sub-text">Firearms Owned</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="title">{firearmsCount?.issued}</div>
            <div className="sub-text">Firearms Issued</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="title">{firearmsCount?.approved}</div>
            <div className="sub-text">Firearms Approved</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px", marginTop: "10px" }}>
        <h4 style={{ color: "white" }}>Search by Type:</h4>
        <select
          id="firearm_type"
          name="firearm_type"
          value={searchTerm}
          onChange={handleSearchChange}
          required
          style={{ padding: "5px" }}
        >
          <option value="">Select Type</option>
          {fa_types.map((type, index) => (
            <option key={index + 1} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "white" }}>My Firearms</h3>
        <Link to="/firearms/add" style={{ color: "white" }}>
          Add Firearm
        </Link>
      </div>
      <div
        style={{
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      >
        <FireTable firearmsData={firearmsData} />
      </div>
    </div>
  );
};

export default Home;
