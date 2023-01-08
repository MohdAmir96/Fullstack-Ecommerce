import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import './AdminSignup.css'
import { db, auth } from "../../Firebase/firebaseConfig"
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
function AdminSignup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState()
    const [confirmPassword, setConirmPassword] = useState()
    const [successAlert, setSuccessAlert] = useState(false)
    const [user, setUser] = useState({})
    let navigate = useNavigate()
    const resetFileds = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setConirmPassword('')
    }
    // onAuthStateChanged....................................
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
    const handleSubmit = async () => {
        if (password === confirmPassword) {
            try {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password,
                )
                resetFileds()
                setSuccessAlert(true)
                setTimeout(() => {
                    setSuccessAlert(false)
                    // navigate('/')
                }, 3000);
                console.log(auth.currentUser.email);
            } catch (error) {
                console.log(error.message);
            }
        }
        else { alert('password doesnt match') }

    }
    // signout***********************************************************
    // const SignOut = async () => {
    //     await signOut(auth)
    // }
    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {successAlert && <Alert
            style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: "999999",
            }}
            severity="success"
        >
            Product Added Succesfully
        </Alert>}
        <div className="signup-box" style={{ width: "50vw", padding: "30px", paddingTop: "0px" }}>
            <h3 >Signup</h3>

            <TextField
                required
                id="firtName"
                name="firstName"
                label="First Name"
                fullWidth
                autoComplete="family-name"
                value={firstName}
                variant="standard"
                onChange={(e) => { setFirstName(e.target.value) }}
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
                onChange={(e) => { setLastName(e.target.value) }}
            />
            <TextField
                required
                id="email"
                name="email"
                label="Email"
                type='email'
                value={email}
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <TextField
                required
                id="password"
                name="password"
                label="password"
                type='password'
                value={password}
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={(e) => { setPassword(e.target.value) }}
            />
            <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type='password'
                value={confirmPassword}
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={(e) => { setConirmPassword(e.target.value) }}
            />
            <Button style={{ marginTop: "10px", border: "none", color: "white", background: "#154f22", width: "100%" }} onClick={handleSubmit} variant="outlined">Register</Button>
        </div>
        {user?.email}
        {/* <button onClick={SignOut}>signout</button> */}
    </div>;
}

export default AdminSignup;
