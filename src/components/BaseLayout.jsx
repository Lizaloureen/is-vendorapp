import { Outlet } from "react-router-dom";
import Header from "./Header";

const BaseLayout = () => {
  return (
    <div
      className="container-fluid main"
      style={{ height: "100vh" }}
    >
      <Header />
      <div className="base-layout">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
