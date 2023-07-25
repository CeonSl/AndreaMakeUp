import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppBarComponent } from "./AppBar";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OptionsProfile from "./OptionsProfile";

export function Navigation() {
  // const profile: Object = useAuthStore(state => state.profile)
  const [openProfile, setOpenProfile] = useState(false);
  const refButtonProfile = useRef<HTMLDivElement>(null);
  const refProfileOptions = useRef<HTMLDivElement>(null);

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#D14D72", zIndex: 100 }}>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Inicio
            </Link>
          </Typography>
          <Stack direction="row" spacing={2} ref={refButtonProfile}>
            <IconButton
              size="small"
              edge="end"
              color="inherit"
              onClick={() => setOpenProfile(!openProfile)}
              aria-label="logo"
            >
              <AccountCircleIcon sx={{ fontSize: "32px" }}></AccountCircleIcon>
            </IconButton>
          </Stack>
          {openProfile ? (
            <OptionsProfile
              setOpenProfile={setOpenProfile}
              refProfileOptions={refProfileOptions}
              refButtonProfile={refButtonProfile}
            />
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <AppBarComponent />
    </>
  );
}
