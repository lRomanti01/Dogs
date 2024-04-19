import React, { useState, useEffect } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  {
    id: "avatar",
    numeric: false,
    disablePadding: true,
    label: "Imagen",
  },
  {
    id: "raza",
    numeric: false,
    disablePadding: false,
    label: "Raza",
  },
  {
    id: "cantidad",
    numeric: true,
    disablePadding: false,
    label: "Cantidad",
  },
  {
    id: "precio",
    numeric: true,
    disablePadding: false,
    label: "Precio",
  },
  {
    id: "ubicacion",
    numeric: false,
    disablePadding: false,
    label: "Ubicacion",
  },
];

export default function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Box sx={{ color: "#fff"}}>
                {headCell.label}
              </Box>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
