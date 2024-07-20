import React, { useEffect, useState } from "react";
import fa_types from "../utils/firearmsTypes";
import manufacturers from "../utils/manufacturers";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { getToken, getUser } from "../utils/helpers";

const AddFirearm = () => {
  const location = useLocation();
  console.log("loc", location);
  const editData = location.state?.editData;

  const [name, setName] = useState(editData ? editData.name : "");
  const [firearm_type, setFirearm_type] = useState(
    editData ? editData.firearm_type : ""
  );
  const [serial_number, setSerial_number] = useState(
    editData ? editData.serial_number : ""
  );
  const [date_of_manufacture, setDate_of_manufacture] = useState(
    editData ? editData.date_of_manufacture : ""
  );
  const [manufacturer, setManufacturer] = useState(
    editData ? editData.manufacturer : ""
  );
  const [image, setImage] = useState("");
  const [description, setDescription] = useState(
    editData ? editData.description : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the firearm data to the server

    const user = getUser();
    const token = getToken();

    if (editData) {
      let formData = {
        name: name,
        firearm_type: firearm_type,
        serial_number: serial_number,
        date_of_manufacture: date_of_manufacture,
        manufacturer: manufacturer,
        image: image,
        description: description,
      };
      try {
        const url = `http://localhost:8000/vendor/firearms/edit/${editData.id}`;

        const res = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        });
        const data = res.data;
        console.log("data", data);

        alert("Firearm Updated successfully");
      } catch (error) {
        console.error("Error adding firearm:", error);
      }
    } else {
      let formData = {
        name: name,
        firearm_type: firearm_type,
        serial_number: serial_number,
        date_of_manufacture: date_of_manufacture,
        manufacturer: manufacturer,
        vendor: user?.id,
        image: image,
        description: description,
      };
      try {
        const url = `http://localhost:8000/vendor/firearms/add`;
        const res = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        });
        const data = res.data;
        console.log("data", data);

        // Clear form fields
        setName("");
        setFirearm_type("");
        setSerial_number("");
        setDate_of_manufacture("");
        setManufacturer("");
        setImage("");
        setDescription("");

        alert("Firearm added successfully");
      } catch (error) {
        console.error("Error adding firearm:", error);
      }
    }
  };

  return (
    <div className="applications-container m-xl">
      <h2>Add Firearm</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid black",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <div className="flex-column">
          <label className="form-label" htmlFor="image">
            Firearm Image *
          </label>
          <input
            className="form-control"
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div className="flex-column">
          <label className="form-label" htmlFor="name">
            Firearm Name *
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex-column">
          <label className="form-label" htmlFor="name">
            Type *
          </label>
          <select
            className="form-control"
            style={{ padding: "10px", marginBottom: "20px" }}
            id="firearm_type"
            name="firearm_type"
            value={firearm_type}
            onChange={(e) => setFirearm_type(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            {fa_types.map((type, index) => (
              <option key={index + 1} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-column">
          <label className="form-label" htmlFor="serial_number">
            Serial Number *
          </label>
          <input
            className="form-control"
            type="text"
            id="serial_number"
            name="serial_number"
            value={serial_number}
            onChange={(e) => setSerial_number(e.target.value)}
            required
          />
        </div>
        <div className="flex-column">
          <label className="form-label" htmlFor="manufacturer">
            Manufacturer *
          </label>
          <select
            className="form-control"
            style={{ padding: "10px", marginBottom: "20px" }}
            id="manufacturer"
            value={manufacturer}
            name="manufacturer"
            onChange={(e) => setManufacturer(e.target.value)}
            required
          >
            <option value="">Select Manufacturer</option>
            {manufacturers.map((type, index) => (
              <option key={index + 1} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-column">
          <label className="form-label" htmlFor="date_of_manufacture">
            Date of Manufacture *
          </label>
          <input
            className="form-control"
            type="date"
            id="date_of_manufacture"
            name="date_of_manufacture"
            value={date_of_manufacture}
            onChange={(e) => setDate_of_manufacture(e.target.value)}
            required
          />
        </div>
        <div className="flex-column">
          <label className="form-label" htmlFor="description">
            Description *
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          >
            Enter description
          </textarea>
        </div>
        <button
          type="submit"
          className="submit-button"
          style={{ backgroundColor: "#4CAF50", padding: "10px" }}
        >
          {editData ? "Update Firearm " : "Add Firearm"}
        </button>
        <br /> <br />
        <Link to="/firearms" className="back-link">
          Back to Firearms
        </Link>
      </form>
    </div>
  );
};

export default AddFirearm;
