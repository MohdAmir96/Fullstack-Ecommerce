import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHoc from "./pages/Admin/Admin";
import AuthProvider from "./context/AuthContext";
import Home from "./pages/home";
import { useState } from "react";
import Navbar from "./component/common/Navbar";
import ProtectedRout from "./component/protextedRout/ProtectedRout";
function App() {
  return (
    <AuthProvider>
      <div style={{ padding: "0 20px" }}>
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
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
