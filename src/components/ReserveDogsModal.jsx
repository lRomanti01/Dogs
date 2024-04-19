import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ReserveDogsModal({ open, handleClose, dogs }) {
  const [dogRace, setDogRace] = useState("");
  const [dogId, setDogId] = useState("");
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleChange = (event) => {
    const dog = dogs.find((item) => item.id == event.target.value);
    setDogId(event.target.value);
    setDogRace(event.target.value);
    setPrice(dog.precio);
  };

  const handlePriceChange = (event) => {
    setAmount(event.target.value);
    setTotalPrice(event.target.value * price);
    setErrorVisible(false);
  };

  const reserveDog = () => {
    if (!dogId) {
      return;
    }

    if (!amount) {
      return;
    }

    const dog = dogs.find((item) => item.id == dogId);

    if (amount > dog.cantidad) {
      setErrorVisible(true);
      return;
    }

    let userDogs = localStorage.getItem("UserDogs"); 
    if (!userDogs) {
        userDogs = [];
    } else {
        userDogs = JSON.parse(userDogs);
    }
    
    userDogs.push({ dog, amount, price, totalPrice });
    localStorage.setItem("UserDogs", JSON.stringify(userDogs));

    setDogRace("")
    setDogId("")
    setAmount(0)
    setPrice(0)
    setTotalPrice(0)
    handleClose()
    toast.success("Perro reservado correctamente", {
      position: "top-right",
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Reservar perros
        </Typography>

        <Box sx={{ minWidth: 120 }}>
          <FormControl
            fullWidth
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <InputLabel id="demo-simple-select-label">Perros</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dogRace}
              label="Raza de perro"
              onChange={handleChange}
            >
              {dogs?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.raza}
                </MenuItem>
              ))}
            </Select>

            <TextField
              id="outlined-controlled"
              label="Cantidad"
              value={amount}
              onChange={handlePriceChange}
              sx={{ mt: 1 }}
            />

            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={reserveDog}
            >
              Enviar
            </Button>

            {errorVisible && (
              <Typography
                id="modal-modal-description"
                sx={{ color: "red", textAlign: "center" }}
              >
                No puedes reservar mas de la cantidad disponible
              </Typography>
            )}
          </FormControl>
        </Box>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Precio: {price}
        </Typography>

        <Typography id="modal-modal-description">
          Precio total: {totalPrice}
        </Typography>

        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, textAlign: "center" }}
        >
          Elige una raza de perro y la cantidad que quieres reservar
        </Typography>
      </Box>
    </Modal>
  );
}
