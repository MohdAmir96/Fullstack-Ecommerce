import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaUserCircle } from "react-icons/fa";
import "./Modal.css";
import TabComponent from "../TabComponent";
import { useUserAuth } from "../../../context/AuthContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2.5,
  "@media (max-width: 900px)": {
    width: "80%",
  },
};

export default function ModalComponent() {
  const { open } = useUserAuth();
  const { setOpen } = useUserAuth();
  const { handleClose } = useUserAuth();
  const { handleOpen } = useUserAuth();

  return (
    <div>
      <Button onClick={handleOpen}>
        <FaUserCircle style={{ scale: "1.5", color: "#fff" }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-container">
          <TabComponent />
        </Box>
      </Modal>
    </div>
  );
}
