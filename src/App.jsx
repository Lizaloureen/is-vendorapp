import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import BaseLayout from "./components/BaseLayout";
import Home from "./pages/Home";
import Firearms from "./pages/Firearms";
import Landingpage from "./pages/Landingpage";
import RegistrationPage from "./pages/Registration";
import PrivateRoutes from "./components/PrivateRoutes";
import Profile from "./pages/Profile";
import AddFirearm from "./pages/AddFirearm";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<RegistrationPage />} />
      <Route path="/landing" element={<Landingpage />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="/firearms" element={<Firearms />} />
          <Route path="/firearms/add" element={<AddFirearm />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
