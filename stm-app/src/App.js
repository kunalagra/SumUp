import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/NotFound";
import Footer from "./Components/Footer";
import CreateSummary from "./Components/CreateSummary";
import RenderSummary from "./Components/RenderSummary";
 
function App() {
  
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <main className="content">
            <Navbar />
            <Routes>
              <Route path="/create" element={<CreateSummary />}/>
              <Route path="/summary" element={<RenderSummary />}/>

              <Route path="/*" element={<NotFound />}/>
            </Routes>
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;