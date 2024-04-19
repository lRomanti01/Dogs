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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function DogsTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("raza");
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Button variant="contained" sx={{ marginBottom: 2 }} onClick={handleOpen}>
        Reservar perros
      </Button>

      <ReserveDogsModal open={open} handleClose={handleClose} dogs={rows} />

      <Paper
        sx={{ width: "100%", mb: 2, backgroundColor: "#2A3650", color: "#fff" }}
      >
        <EnhancedTableToolbar title={"Perros"} numSelected={selected.length} />
        {/* 
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={row.avatar}
                        onClick={() => handleOpenBackdrop(row.avatar)}
                      />
                    </TableCell>

                    <TableCell sx={{ color: "#fff" }} align="left">
                      {row.raza}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="right">
                      {row.cantidad}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="right">
                      {row.precio}$
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="left">
                      {row.ubicacion}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer> */}

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
                  Precio
                </StyledTableCell>
                <StyledTableCell style={{ backgroundColor: "#1E1E1E" }}>
                  Ubicación
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#1E1E1E" }}>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Avatar
                      alt="Remy Sharp"
                      src={row.avatar}
                      onClick={() => handleOpenBackdrop(row.avatar)}
                      sx={{cursor: "pointer"}}
                    />
                  </TableCell>

                  <TableCell sx={{ color: "#fff" }} align="left">
                    {row.raza}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="right">
                    {row.cantidad}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="right">
                    {row.precio}$
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left">
                    {row.ubicacion}
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
          // backIconButtonProps={{backgroundColor: "#fff"}}
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
