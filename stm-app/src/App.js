import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/NotFound";
import Footer from "./Components/Footer";
import CreateSummary from "./Components/CreateSummary";
import RenderSummary from "./Components/RenderSummary";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import UpdatePassword from "./Components/update";
import ResetPassword from "./Components/reset";
import { Component } from "react";
import { withRouter } from "./ComponentWithRouter";
import { CommonProvider } from "./Context/commonContext";


function withThemeProvider(Component) {
  return function WrappedComponent(props) {
    const [theme, colorMode] = useMode();
    return <Component {...props} theme={theme} colorMode={colorMode} />;
  };
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUserPage: false,
    };
  }

  componentDidMount() {
    this.onRouteChanged();
  }

  render() {
    const navbar = !this.state.isUserPage? <Navbar /> : "";
    return (
      <CommonProvider>
      <ColorModeContext.Provider value={this.props.colorMode}>
        <ThemeProvider theme={this.props.theme}>
          <CssBaseline />
          <div className="app">
            <main className="content">
              { navbar }
              <Routes>
                <Route path="/summarize" element={<CreateSummary />} />
                <Route path="/summary" element={<RenderSummary />} />
                <Route path="/user" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/update" element={<UpdatePassword />} />
                <Route path="/reset" element={<ResetPassword />} />

                <Route path="/*" element={<NotFound />} />
              </Routes>
              <Footer />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      </CommonProvider>
    );
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.router.location.pathname, prevProps.router.location.pathname)
    if(this.props.router.location!==prevProps.router.location){
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    // console.log("Route changed", this.props.router.location.pathname);
    if(this.props.router.location.pathname==='/login') {
      this.setState({
        isUserPage: true,
      })
    }
    else{
      this.setState({
        isUserPage: false,
      })
    }
  }

}

export default withThemeProvider(withRouter(App));
