import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { db, auth } from "../../Firebase/firebaseConfig";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Divider from "@mui/material/Divider";
import { useUserAuth } from "../../context/AuthContext";
function UserSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  let navigate = useNavigate();
  const { logIn } = useUserAuth();
  const { handleClose } = useUserAuth();
  const { setAdminSignupPage } = useUserAuth();
  const { adminSignupPage } = useUserAuth();

  const handleSubmit = async () => {
    try {
      await logIn(email, password);
      handleClose(false);
      navigate("/admin");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0",
      }}
    >
      <div className="signup-box" style={{ padding: "0" }}>
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
          <h3 style={{ padding: "0" }}>Admin Signin</h3>
        </div>
        <TextField
          required
          id="email"
          // name="email"
          label="Email"
          type="email"
          value={email}
          fullWidth
          variant="standard"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          required
          id="password"
          // name="password"
          label="password"
          type="password"
          value={password}
          fullWidth
          variant="standard"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button
          style={{
            marginTop: "20px",
            border: "none",
            color: "white",
            background: "#154f22",
            width: "100%",
          }}
          onClick={handleSubmit}
          variant="outlined"
        >
          Signin
        </Button>

        <Divider />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {/* <Button
            sx={{ color: "black" }}
            onClick={() => {
              setAdminSignupPage(false);
              console.log(adminSignupPage);
            }}
            variant="outlined"
          >
            Signup
          </Button> */}
          <span>Did'nt have account?? <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              setAdminSignupPage(false);
              console.log(adminSignupPage);
            }}>Signup</span></span>
        </div>
      </div>
    </div>
  );
}

export default UserSignin;
