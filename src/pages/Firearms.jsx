import { useEffect, useState } from "react";
import FireTable from "../components/FireTable";
import { Link } from "react-router-dom";
import { getToken } from "../utils/helpers";
import axios from "axios";

const Firearms = () => {
  const [firearmsData, setFirearmsData] = useState([]);

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

  useEffect(() => {
    getFirearms();
  }, []);

  return (
    <div style={{ paddingTop: "20px" }}>
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

export default Firearms;
