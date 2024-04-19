import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import ReserveDogsModal from "./ReserveDogsModal";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const getDogs = () => {
  const url = "https://6619ea4a125e9bb9f29afc5c.mockapi.io/api/v1/Perros";
};

export default function ReservedDogsTable() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [backdropImage, setBackdropImage] = useState("");
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      raza: "Judy Barton",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/505.jpg",
      cantidad: "20",
      precio: "347.00",
      ubicacion: "Bedfordshire",
      id: "1",
    },
    {
      raza: "Jesus Stehr",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/234.jpg",
      cantidad: "30",
      precio: "483.00",
      ubicacion: "Berkshire",
      id: "2",
    },
  ]);

  useEffect(() => {
    const userDogs = JSON.parse(localStorage.getItem("UserDogs"))
    if(userDogs){
        setRows(userDogs)
    }
  }, [])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
    setBackdropImage("");
  };
  const handleOpenBackdrop = (image) => {
    setOpenBackdrop(true);
    setBackdropImage(image);
  };

  return (
    <Box sx={{ width: "70%" }}>
      <Paper
        sx={{ width: "100%", mb: 2, backgroundColor: "#2A3650", color: "#fff" }}
      >
        <EnhancedTableToolbar title={"Perros reservados"} numSelected={selected.length} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  style={{ backgroundColor: "#1E1E1E" }}
                >
                  Imagen
                </StyledTableCell>
                <StyledTableCell style={{ backgroundColor: "#1E1E1E" }}>
                  Raza
                </StyledTableCell>
                <StyledTableCell
                  style={{ backgroundColor: "#1E1E1E" }}
                  align="right"
                >
                  Cantidad
                </StyledTableCell>
                <StyledTableCell
                  style={{ backgroundColor: "#1E1E1E" }}
                  align="right"
                >
                  Precio a pagar
                </StyledTableCell>
                <StyledTableCell style={{ backgroundColor: "#1E1E1E" }}>
                  Ubicación
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#1E1E1E" }}>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Avatar
                      alt="Remy Sharp"
                      src={row?.dog?.avatar}
                      onClick={() => handleOpenBackdrop(row?.dog?.avatar)}
                      sx={{cursor: "pointer"}}
                    />
                  </TableCell>

                  <TableCell sx={{ color: "#fff" }} align="left">
                    {row?.dog?.raza}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="right">
                    {row?.amount}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="right">
                    {row?.totalPrice}$
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left">
                    {row?.dog?.ubicacion}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: "#fff" }}
          color="#fff"
        />
      </Paper>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <img src={backdropImage} alt={backdropImage} height="300px" />
      </Backdrop>
    </Box>
  );
}
