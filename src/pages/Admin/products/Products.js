import { useState } from "react";
import { db, storage } from "../../../Firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./Product.css";
import Alert from "@mui/material/Alert";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserAuth } from "../../../context/AuthContext";
const Products = () => {
  const [name, setName] = useState();
  const [isShowForm, setIsShowForm] = useState(false);
  // form data************************
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("formal");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [shippingPrice, setShippingPrice] = useState();
  const [successAlert, setSuccessAlert] = useState(false);

  const userCollectionRef = collection(db, "products");
  const addProducts = async () => {
    const imgRef = ref(storage, "imageURL");
    uploadBytes(imgRef, image)
      .then(() => {
        getDownloadURL(imgRef).then((url) => {
          setImageURL(url);
          console.log("imageURL", imageURL);
        });
      })
      .catch((e) => console.log(e.message));
    try {
      await addDoc(userCollectionRef, {
        productDescription: desc,
        productPrice: price,
        productCategory: category,
        productImage: imageURL,
        productShippingPrice: shippingPrice,
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  // **************************************************
  const handleAddProduct = () => {
    document.getElementById("add-products").style.display = "none";
    document.getElementById("save").style.display = "block";
    setIsShowForm(true);
  };
  const handleSave = () => {
    document.getElementById("save").style.display = "none";
    document.getElementById("add-products").style.display = "block";
    setIsShowForm(false);
    if (desc && price && category && image && shippingPrice) {
      addProducts();
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 5000);
      setDesc("");
      setPrice();
      setImage("");
      setShippingPrice();
    } else {
      alert("please fill all the fields!!");
    }
  };
  // **************************
  const handleSelectCategory = (event) => {
    setCategory(event.target.value);
  };
  // Get All Products
  const { products } = useUserAuth();
  console.log("products", products);
  return (
    <div
      style={{
        display: "flex",
        marginTop: "50px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {successAlert && (
        <Alert
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: "999999",
          }}
          severity="success"
        >
          Product Added Succesfully
        </Alert>
      )}
      <div style={{ width: "100%" }}>
        <Button onClick={handleAddProduct} variant="outlined" id="add-products">
          Add Products
        </Button>
        <Button
          variant="outlined"
          style={{ marginBottom: "40px", display: "none" }}
          onClick={handleSave}
          id="save"
        >
          Save
        </Button>
      </div>
      {isShowForm ? (
        <Grid
          container
          spacing={3}
          className="form-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px",
            paddingTop: "10px",
            width: "80%",
          }}
        >
          <TextField
            required
            id="lastName"
            name="Product Description"
            label="Product Description"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            // style={{ width: '60%' }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
            value={category}
            onChange={handleSelectCategory}
            label="Product Category"
            variant="standard"
            placeholder="Product Category"
            fullWidth
            className="select"
            required
          // style={{ width: "60%" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"formal"}>Formal</MenuItem>
            <MenuItem value={"casual"}>Casual</MenuItem>
            <MenuItem value={"sports"}>Sports</MenuItem>
          </Select>

          <div style={{ borderBottom: "1px solid grey", width: "100%" }}>
            <label htmlFor="" style={{ marginRight: "10px", color: "grey" }}>
              Product image
            </label>
            <input
              className="img-input"
              style={{ backgroundColor: "transparent", padding: "10px 0" }}
              type="file"
              // value={undefined}
              onChange={(e) => {
                e.preventDefault();
                setImage(e.target.files[0]);
              }}
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
            value={shippingPrice}
            onChange={(e) => setShippingPrice(e.target.value)}
          />
        </Grid>
      ) : null}
      {products && products.map(item => <div>{item.productCategory}</div>)}
    </div>
  );
};

export default Products;
