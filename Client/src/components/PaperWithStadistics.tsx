import { Box, Typography } from "@mui/material";

interface props {
  title: string;
  mainData: number | undefined | string;
  children: React.ReactNode;
  info: string;
  fontSizeSended?: number;
}

export default function PaperWithStadistics({
  title,
  mainData,
  children,
  info,
  fontSizeSended,
}: props) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 1,
        }}
      >
        <Box sx={{ flex: "20%" }}>
          <Typography
            sx={{
              height: 1,
              display: "flex",
              alignItems: "center",
              marginLeft: 2,
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ flex: "80%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              height: 1,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: fontSizeSended ? fontSizeSended : 50,
                  fontWeight: "bold",
                  marginTop: fontSizeSended ? 2 : "",
                }}
              >
                {mainData}
              </Typography>
              <Typography
                sx={{
                  color: "#03C988",
                  fontSize: 25,
                }}
              >
                {children}
              </Typography>
              <Typography
                sx={{
                  color: "#777",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {info}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
