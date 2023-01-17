import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHoc from "./pages/Admin/Admin";
import Home from "./pages/home/home";
import { useState } from "react";
import Navbar from "./component/common/Navbar";
import ProtectedRout from "./component/protextedRout/ProtectedRout";
import { UserAuthContextProvider } from "./context/AuthContext";
import AdminSignup from "./pages/authentication/AdminSignup";

function App() {
  return (
    <UserAuthContextProvider>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin"
              element={
                <ProtectedRout>
                  <AdminHoc />
                </ProtectedRout>
              }
            />
            <Route path="/adminsignup" element={<AdminSignup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserAuthContextProvider>
  );
}

export default App;
