import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("isVendorToken");

  if (token === "" || token === "undefined") {
    navigate("/login", { replace: true });
  }

  return (
    <div className="container-fluid">
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
