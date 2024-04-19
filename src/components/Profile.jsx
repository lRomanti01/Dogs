import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ReservedDogsTable from "./ReservedDogsTable";

export default function Profile() {
  const [user, setUser] = useState({})

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = () => { 
    const userData = JSON.parse(localStorage.getItem("userData"))
    if(userData){
      setUser(userData)
    }
  }

  return (
    <Box sx={{ width: "100%", display: "flex", gap: 2}}>
      <Card sx={{ maxWidth: "25%", height: "50%", backgroundColor: "#2A3650", minWidth: 200 }}>
        <CardActionArea
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              backgroundImage: "url(https://purina.com.do/sites/default/files/styles/webp/public/2022-10/purina-brand-edad-de-los-perros-nota_01.jpg.webp?itok=O2CI6zjg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              display: "flex",
              // alignItems: "flex-end",
              justifyContent: "center",
              height: 200,
              overflow: "visible" 
            }}
          > 
            <Avatar
              sx={{
                m: 1,
                bgcolor: "#fff",
                width: "5em",
                height: "5em",
                marginTop: "150px"
              }}
              style={{
                border: "0.1px solid gray",
              }}
            >
              <img src={user.avatar} />
            </Avatar>
          </Box>

          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "center", marginTop: 5, color: "#fff" }}
            >
              {user.name} {user.apellido}
            </Typography>
            <Typography variant="body2" color={"#fff"} sx={{
              textAlign: "center"
            }}>
              {user.username}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <ReservedDogsTable />
    </Box>
  );
}
