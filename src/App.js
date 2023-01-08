import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import AdminHoc from "./pages/Admin/Admin";
import FirebaseProvider from "./context/FirebaseContext";
import AdminSignup from "./pages/authentication/AdminSignup";
import Home from "./pages/home";
function App() {
  return (
    <FirebaseProvider>
      <div style={{ padding: "0 20px" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/admin" element={<AdminHoc />} />
            <Route path="/adminsignup" element={<AdminSignup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </FirebaseProvider>
  );
}

export default App;
