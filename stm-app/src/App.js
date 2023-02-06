import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/NotFound";
import Footer from "./Components/Footer";
import CreateSummary from "./Components/CreateSummary";
import RenderSummary from "./Components/RenderSummary";
import Profile from "./Components/Profile";
import AboutUs from "./Components/AboutUs";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
 
function App() {
  
  const [theme, colorMode] = useMode();
  // const navbar = (window.location.pathname!=='/login' && window.location.pathname!=='/signup')? <Navbar /> : "";
  // console.log(window.location.pathname);
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
              <Route path="/user" element={<Profile />}/>
              <Route path="/about" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

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