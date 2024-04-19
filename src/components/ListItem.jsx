import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const logout = () => {
  localStorage.removeItem("userData")
}

const MainListItems = (
  <>
    {/* <ListItemButton>
      <ListItemIcon>
        <DashboardIcon sx={{ color: "#fff" }} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton> */}
    <Link to="/" style={{ color: "#fff" }}>
      <ListItemButton>
        <ListItemIcon>
          <PetsIcon sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText primary="Perros" />
      </ListItemButton>
    </Link>
    {/* <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon sx={{ color: "#fff" }} />
      </ListItemIcon>
      <ListItemText primary="Lista de reservas" />
    </ListItemButton> */}
  </>
);

const SecondaryListItems = (
  <>
    <ListSubheader
      component="div"
      inset
      sx={{ backgroundColor: "#2A3650", color: "#fff" }}
    >
      Usuario
    </ListSubheader>
    <Link to="/profile" style={{ color: "#fff" }}>
      <ListItemButton>
        <ListItemIcon>
          <PersonIcon sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItemButton>
    </Link>

    <Link to="/login" onClick={logout} style={{ color: "#fff" }}>
      <ListItemButton>
        <ListItemIcon>
          <ExitToAppIcon sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItemButton>
    </Link>
  </>
);

export { MainListItems, SecondaryListItems };
