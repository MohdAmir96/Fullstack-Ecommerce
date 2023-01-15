import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { db, auth } from "../../Firebase/firebaseConfig";
import { usecontext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserAuth } from "../../context/AuthContext";
function UserSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConirmPassword] = useState();
  const [successAlert, setSuccessAlert] = useState(false);
  const [user, setUser] = useState({});
  const { signUp } = useUserAuth();
  let navigate = useNavigate();
  const resetFileds = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConirmPassword("");
  };
  const handleSubmit = async () => {
    if (password === confirmPassword) {
      try {
        await signUp(email, password);
        resetFileds();
        setSuccessAlert(true);
        toast.success("Registered Succesfully!!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/");
        }, 4000);
        console.log(auth.currentUser.email);
        setUser(auth.currentUser.email);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error("Password doesnt match!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        with: "100%",
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="signup-box" style={{ width: "100%", paddingTop: "0px" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
            height: "20px",
          }}
        >
          <h3 style={{ padding: "0" }}>User Signup</h3>
        </div>

        <TextField
          required
          id="firtName"
          name="firstName"
          label="First Name"
          fullWidth
          autoComplete="family-name"
          value={firstName}
          variant="standard"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          required
          id="lastName"
          name="lasstName"
          label="last Name"
          value={lastName}
          fullWidth
          autoComplete="family-name"
          variant="standard"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <TextField
          required
          id="email"
          name="email"
          label="Email"
          type="email"
          value={email}
          fullWidth
          autoComplete="family-name"
          variant="standard"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          required
          id="password"
          name="password"
          label="password"
          type="password"
          value={password}
          fullWidth
          autoComplete="family-name"
          variant="standard"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          required
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          fullWidth
          autoComplete="family-name"
          variant="standard"
          onChange={(e) => {
            setConirmPassword(e.target.value);
          }}
        />
        <Button
          style={{
            marginTop: "10px",
            border: "none",
            color: "white",
            background: "#154f22",
            width: "100%",
          }}
          onClick={handleSubmit}
          variant="outlined"
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default UserSignup;
