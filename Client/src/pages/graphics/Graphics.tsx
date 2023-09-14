import { Box, Paper, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PaperWithStadistics from "../../components/PaperWithStadistics";
import MovingIcon from "@mui/icons-material/Moving";
import { Line, Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { useFetchGetNewSells } from "../../logic/GetNewSellsByDate";

export function Graphics() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const newDate = new Date(date);
      setStartDate(newDate);
    }
  };

  const findNewSells = () => {
    const { newSellsRecieved } = useFetchGetNewSells(
      startDate!.getMonth(),
      startDate!.getFullYear()
    );
    return newSellsRecieved // Use the fetched value directly
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Tienda 1",
        data: [1, 2, 3, 12, 32, 12, 14, 141],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tienda 2",
        data: [1, 2, 12],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const dataBar = {
    labels: [
      "producto 1",
      "producto 2",
      "producto 3",
      "producto 4",
      "producto 5",
      "producto 6",
      "producto 7",
      "producto 8",
      "producto 9",
      "producto 10",
    ],
    datasets: [
      {
        data: [2, 3, 13, 13, 131, 313, 11, 20, 42, 112],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(99, 255, 132, 0.5)",
          "rgba(100, 205, 199, 0.5)",
          "rgba(255, 99, 232, 0.5)",
          "rgba(255, 199, 132, 0.5)",
          "rgba(155, 99, 132, 0.5)",
          "rgba(55, 99, 132, 0.5)",
          "rgba(255, 120, 132, 0.5)",
          "rgba(255, 99, 32, 0.5)",
          "rgba(155, 29, 232, 0.5)",
        ],
      },
    ],
  };

  return (
    <>
      <Box sx={{ my: 13, mx: 12 }}>
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
              onChange={handleDateChange}
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
              mainData={findNewSells()}
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
                padding: 1,
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
              padding: "0 20px 20px 20px",
              maxWidth: "1300px",
              width: 1,
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Line data={data} options={options} />
            </Box>
          </Box>
        </Paper>
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
                padding: 1,
                display: "flex",
                alignItems: "center",
                marginLeft: 2,
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              Top 10 Productos Más Vendidos
            </Typography>
          </Box>
          <Box
            sx={{
              flex: "80%",
              padding: "0 20px 20px 20px",
              maxWidth: "1300px",
              width: 1,
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Bar data={dataBar} options={optionsBar} />
            </Box>
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
