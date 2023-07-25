import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Paper } from "@mui/material";
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

interface props {
  refButtonProfile: MutableRefObject<HTMLDivElement | null>;
  refProfileOptions: MutableRefObject<HTMLDivElement | null>;
  setOpenProfile: Dispatch<SetStateAction<boolean>>;
}

function OptionsProfile({
  setOpenProfile,
  refButtonProfile,
  refProfileOptions,
}: props) {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleClickOutside = (e: MouseEvent) => {
    if (
      refButtonProfile?.current &&
      refProfileOptions?.current &&
      !refButtonProfile?.current?.contains(e.target as Node) &&
      !refProfileOptions?.current?.contains(e.target as Node)
    ) {
      setOpenProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Paper
      ref={refProfileOptions}
      sx={{
        position: "absolute",
        top: 50,
        zIndex: 200,
        right: 25,
        width: "200px",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Button
        sx={{
          color: "#000",
          fontSize: 12,
          height: 1,
          fontWeight: "400",
          textTransform: "capitalize",
        }}
      >
        Perfil
      </Button>
      <Divider />
      <Button
        sx={{
          color: "#000",
          height: 1,
          fontSize: 12,
          fontWeight: "400",
          textTransform: "capitalize",
        }}
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </Paper>
  );
}

export default OptionsProfile;
