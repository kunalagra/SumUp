import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Component } from "react";
import { withRouter } from "./ComponentWithRouter";
import { CommonProvider } from "./Context/commonContext";
import RouterRoutes from "./RouterRoutes";


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
              <RouterRoutes />
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
