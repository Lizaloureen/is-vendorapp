import React, { useState } from "react";
import Modal from "./Modal";
import { getToken } from "../utils/helpers";
import axios from "axios";
import { Link } from "react-router-dom";

const FireTableRow = ({ firearm }) => {
  const [isModalOpen, setIsModalOpen] = useState(undefined);
  const [clientEmail, setClientEmail] = useState("");

  const openModal = (id) => {
    setIsModalOpen(id);
  };

  const closeModal = () => {
    setIsModalOpen(undefined);
  };

  const handleIssueFirearm = async (e) => {
    e.preventDefault();
    const token = getToken();

    let formData = {
      clientEmail,
      id: firearm.id,
    };

    console.log("Firearm data:", formData);

    try {
      const url = `http://localhost:8000/vendor/firearms/issue`;
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      const data = res.data;
      console.log("data", data);

      // Clear form fields
      setEmail("");

      alert("Firearm added successfully");
    } catch (error) {
      console.error("Error adding firearm:", error.response.data);
      alert(error?.response?.data?.message);
    }
  };

  return (
    <tr>
      <td>
        <img
          src={`http://127.0.0.1:8000/${firearm.image}`}
          alt=""
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td>{firearm?.name} </td>
      <td>{firearm.firearm_type}</td>
      <td>{firearm.serial_number}</td>
      <td>{firearm.manufacturer}</td>
      <td>{firearm.date_of_manufacture}</td>
      <td>{firearm.vendor.name}</td>
      <td>{firearm.description}</td>
      <td>{firearm.status}</td>
      <td>{firearm.is_approved ? "Approved" : "Not Approved"}</td>
      <td>
        {firearm.status == "Available" && (
          <p
            style={{
              color: "lime",
              cursor: "pointer",
              fontSize: "14px",
              textDecoration: "underline",
            }}
            onClick={() => {
              openModal(`issue_${firearm.id}`);
            }}
          >
            Issue
          </p>
        )}
        <Link
          to="/firearms/add"
          style={{ color: "red", cursor: "pointer", fontSize: "13px" }}
          state={{ editData: firearm }}
        >
          Edit
        </Link>
        <Modal id={firearm.id} isOpen={isModalOpen} onClose={closeModal}>
          <p>Issue Firearm: {firearm.serial_number}</p> <br />
          <form
            onSubmit={handleIssueFirearm}
            style={{
              margin: "0px",
              padding: "0px",
              border: "none",
              width: "100%",
            }}
          >
            <div className="form-group">
              <label htmlFor="clientEmail">Client Email</label>
              <input
                style={{
                  padding: "10px",
                  width: "95%",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                }}
                name="clientEmail"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                type="email"
                placeholder="Enter Client Email"
              />
            </div>
            <input
              type="submit"
              value="Issue Firearm"
              className="button"
              style={{ backgroundColor: "green" }}
              onClick={() => {}}
            />
          </form>
        </Modal>
      </td>
    </tr>
  );
};

export default FireTableRow;
