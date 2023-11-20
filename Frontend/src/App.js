import "./App.scss";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./pages/DashBoard";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebarver";
import Login from "./pages/Login";
import DemographicPage from "./pages/Demographic/DemographicPage";
import HouseholdPage from "./pages/Household/HouseholdPage";
import TabernaclePage from "./pages/Tabernacle/TabernaclePage";
import AbsentPage from "./pages/Absent/AbsentPage";
import HouseholdAddPage from "./pages/Household/HouseholdAddPage";
import { Triangle } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/authSlice";
import { useEffect, useState } from "react";
import UnAuth from "./Routes/unAuthRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Switch } from "react-router-dom";
import NotfoundPage from "./pages/NotfoundPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import RevenuePage from "./pages/Income/RevenuePage";
import RevenueItem from "./pages/Income/RevenueItem";
import RevenueHouse from "./pages/Income/RevenueHouse";
import HouseholdPutPage from "./pages/Household/HouseholdPutPage";
import RoomPage from "./pages/Room/RoomPage";
import ChangeInfoPage from "./pages/ChangeInfoPage";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [component, setComponent] = useState();
  const getCurrentView = () => {
    if (isAuthenticated === false) {
      return <UnAuth />;
    } else
      return (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Switch>
                  <Route path="/" exact component={DashBoard} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/change-password" exact component={ChangePasswordPage} />
                  <Route path="/change-info" exact component={ChangeInfoPage} />
                  <Route path="/revenue" exact component={RevenuePage} />
                  <Route path="/revenue-item" exact component={RevenueItem} />
                  <Route path="/revenue-house" exact component={RevenueHouse} />
                  {
                    (user?.roleId === 1 || user?.roleId == 2) && <><Route path="/demographic" exact component={DemographicPage} />
                      <Route path="/household" exact component={HouseholdPage} />
                      <Route path="/room" exact component={RoomPage} />
                      <Route path="/household-add" exact component={HouseholdAddPage} />
                      <Route path="/:id/edit" exact component={HouseholdPutPage} />
                      <Route path="/tabernacle" exact component={TabernaclePage} />
                      <Route path="/absent" exact component={AbsentPage} />
                    </>
                  }
                  <Route path="*" component={NotfoundPage} />
                </Switch>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      );
  };
  useEffect(() => {
    dispatch(loadUser());
    setComponent(getCurrentView());
  }, []);
  useEffect(() => {
    setComponent(getCurrentView());
  }, [isAuthenticated]);
  return (
    <>
      <BrowserRouter>
        {!isLoading ? (
          <>{component}</>
        ) : (
          <div className="loading-container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <Triangle
              height="100"
              width="100"
              color="#1877f2"
              ariaLabel="loading"
            />
            <div>Loading data...</div>
          </div>
        )}
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;