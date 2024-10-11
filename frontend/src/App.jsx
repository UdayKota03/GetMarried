import "./App.css";
// import Navbar from "./components/Navbar";
// import Header from "./components/Header"
// import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./home/Home";
import Register from "./components/Register";
import VerifyOtp from "./components/VerifyOtp";
import Login from "./components/Login";
import useStore from "./store/store";
import HomeAft from "./homeAftLogin/HomeAft";
import ExploreProfiles from "./components/ExploreProfiles";
import { useEffect } from "react";
import Interest from "./components/Interest";
import Matches from "./components/Matches";
import NavbarAft from "./components/NavbarAft";
import CreateProfile from "./components/CreateProfile";

function App() {
  const { user } = useStore();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<HomeAft />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyOtp />} />
          <Route path="/createprofile" element={<>
                <NavbarAft />
                <CreateProfile />
              </>} />
          <Route
            path="/profiles"
            element={
              <>
                <NavbarAft />
                <ExploreProfiles />
              </>
            }
          />
          <Route
            path="/interest"
            element={
              <>
                <NavbarAft />
                <Interest />
              </>
            }
          />
          <Route
            path="/matches"
            element={
              <>
                <NavbarAft />
                <Matches />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
