import { ThemeProvider, createTheme } from "@mui/material/styles";
import ApplicationForm from "./components/applicationForm";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 300,
      lg: 1200,
    },
  },
  typography: {
    fontFamily: ["Rubik"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApplicationForm />
    </ThemeProvider>
  );
}

export default App;
