import React, { useEffect } from 'react'
import { db, storage } from "../../../Firebase/firebaseConfig"
import { addDoc, collection, doc, } from 'firebase/firestore'
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage'
import { useUserAuth } from '../../../context/AuthContext'
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from 'react-toastify';
import './Product.css'
const App = () => {
  const [progressPercent, setProgressPercent] = React.useState(0)
  const [url, setUrl] = React.useState(null)
  const userCollectionRef = collection(db, "products");

  const handleSubmit = async (e) => {
    e.preventDefault()
    const file = e.target[4].files[0]
    if (!file) return null;
    const storageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    await uploadTask.on("state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgressPercent(progress)
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log(downloadURL);
          setUrl(downloadURL)
          addDoc(userCollectionRef, {
            ProductionDesc: e.target[1].value,
            ProductionPrice: e.target[2].value,
            ProductionCategory: e.target[3].value,
            ProductImage: downloadURL,
            ShippingPrice: e.target[5].value,
          });
          document.getElementById('progress').style.display = 'block'

        }).then(() => {
          toast.success('Product Added Succesfully!', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          handleSubmitBtn()
        })
      }
    )

  }

  const { products } = useUserAuth()
  // handleSubmitBtn
  const handleSubmitBtn = () => {
    document.getElementById('add-btn').style.display = 'block'
    document.getElementById('submit-btn').style.display = 'none'
    document.getElementById('form').style.display = 'none'
  }
  const handleAddBtn = () => {

    document.getElementById('add-btn').style.display = 'none'
    document.getElementById('submit-btn').style.display = 'block'
    document.getElementById('form').style.display = 'block'
  }
  return (
    <div className="app" style={{ marginTop: "50px", display: "flex", flexDirection: "column", alignItems: "center", }} name='upload_file'>
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
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
        <Button onClick={handleAddBtn} id="add-btn" type='submit' variant="contained">Add Products</Button>
      </div>

      <form onSubmit={handleSubmit} id='form' style={{ display: "none" }}>

        <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
          <Button style={{ display: "none" }} id='submit-btn' type='submit' variant="contained">Submit</Button>
        </div>
        <TextField
          required
          id="lastName"
          name="Product Description"
          label="Product Description"
          fullWidth
          autoComplete="family-name"
          variant="standard"


        />

        <TextField
          required
          id="country"
          type="number"
          name="country"
          label="Product Price"
          fullWidth
          autoComplete="shipping country"
          variant="standard"


        />

        <InputLabel
          id="demo-simple-select-label"
          style={{ display: "flex", justifyContent: "flex-start" }}
          mb={3}
        >
          Product Category
        </InputLabel>
        <Select
          labelId="Product Category"
          id="demo-simple-select-standard"
          label="Product Category"
          variant="standard"
          placeholder="Product Category"
          fullWidth
          className="select"
          required
        // style={{ width: "60%" }}
        >
          <MenuItem value="">

          </MenuItem>
          <MenuItem value={"Sofa"}>Sofa</MenuItem>
          <MenuItem value={"Chairs"}>Chairs</MenuItem>
          <MenuItem value={"Beds"}>Beds</MenuItem>
        </Select>

        <div style={{ borderBottom: "1px solid grey", width: "100%" }}>
          <label htmlFor="" style={{ marginRight: "10px", color: "grey" }}>
            Product image
          </label>
          <input
            className="img-input"
            style={{ backgroundColor: "transparent", padding: "10px 0" }}
            type="file"

          />
        </div>
        <TextField
          type="number"
          required
          id="country"
          name="country"
          label="Shipping Price"
          fullWidth
          autoComplete="shipping price"
          variant="standard"

        />
        <progress value={progressPercent} max="100" id='progress' style={{ width: "100%", display: "none" }} />
      </form>
      <table>
        <thead>
          <td>S.N.</td>
          <td>Product Description</td>
          <td>Price(Rs)</td>
          <td>Category</td>
          <td>Product Image</td>
          <td>Shipping Price</td>
        </thead>
        <tbody>
          {
            products && products.map((item, idx) =>
              <tr>
                <td>{idx + 1}</td>
                <td>{item.ProductionDesc}</td>
                <td>{item.ProductionPrice}</td>
                <td>{item.ProductionCategory}</td>
                <td><img style={{ width: "100px", height: "60px" }} src={item.ProductImage} alt="" /></td>
                <td>{item.ShippingPrice}</td>
              </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
