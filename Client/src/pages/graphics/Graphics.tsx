import { Box,  Paper, Typography } from "@mui/material";
import "../../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from "react-vis";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PaperWithStadistics from "../../components/PaperWithStadistics";
import MovingIcon from "@mui/icons-material/Moving";

export const data = [
  { x: 0, y: 8 },
  { x: 1, y: 5 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 1 },
  { x: 5, y: 7 },
  { x: 6, y: 6 },
  { x: 7, y: 3 },
  { x: 8, y: 2 },
  { x: 9, y: 0 },
];

export function Graphics() {
  return (
    <>
      <Box sx={{ my: 13, mt: 15, mx: 5 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#333",
            fontWeight: "bold",
          }}
        >
          ESTADÍSTICAS GENERALES
        </Typography>
        <Box sx={{ my: 2 }}>
          <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Rango de Tiempo"
              views={["month", "year"]}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                boxShadow: 3,
                borderRadius: 1.5,
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            justifyContent: "center",
            width: 1,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              flex: "20%",
              minWidth: "300px",
              maxWidth: "450px",
              height: "300px",
              color: "#333",
            }}
          >
            <PaperWithStadistics
              title="Nuevas Ventas"
              info="vs los últimos 30 días"
              mainData={200}
            >
              <MovingIcon />
              13%
            </PaperWithStadistics>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              minWidth: "300px",
              maxWidth: "450px",
              flex: "20%",
              height: "300px",
              color: "#333",
            }}
          >
            <PaperWithStadistics
              title="Día para vender"
              info="de las ventas son realizadas este día"
              mainData={"Lunes"}
            >
              20%
            </PaperWithStadistics>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              minWidth: "300px",
              maxWidth: "450px",
              flex: "20%",
              height: "300px",
              color: "#333",
            }}
          >
            <PaperWithStadistics
              title="Ingresos Totales"
              info="vs los últimos 30 días"
              mainData={"S/.13,050"}
            >
              <MovingIcon />
              36%
            </PaperWithStadistics>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              maxWidth: "450px",
              minWidth: "300px",
              flex: "20%",
              height: "300px",
              color: "#333",
            }}
          >
            <PaperWithStadistics
              title="Producto Más Vendido"
              info="vs los últimos 30 días"
              mainData={"Pintura de labio roja"}
              fontSizeSended={30}
            >
              <MovingIcon />
              13%
            </PaperWithStadistics>
          </Paper>
        </Box>
        <Paper
          elevation={3}
          sx={{
            mt: 2,
            width: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              flex: "20%",
            }}
          >
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
              Ventas en Cada Tienda
            </Typography>
          </Box>
          <Box
            sx={{
              flex: "80%",
            }}
          >
                <XYPlot height={300} width={300}>
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis />
                  <YAxis />
                  <LineSeries data={data} style={{fill:"none"}}/>
                </XYPlot>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            mt: 2,
            width: 1,
          }}
        >
          <Box
            sx={{
              flex: "20%",
            }}
          >
            12
          </Box>
          <Box
            sx={{
              flex: "80%",
              backgroundColor: "red",
            }}
          >
            12231321
          </Box>
        </Paper>
      </Box>
      {/* <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box sx={{ alignSelf: "center" }}>
          
        </Box>
      </Container> */}
    </>
  );
}
