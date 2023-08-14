/* COMPONENTS */
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import JobDetail from "./components/JobDetail/JobDetail";
import FormWorkCreated from "./components/FormWorkCreated/FormWorkCreated";
import WorkPublications from "./components/WorkPublications/WorkPublications";
import UnderDevelopment from "./components/UnderDevelopment/UnderDevelopment";
import Profile from "./components/PanelUser/Profile";
import Settings from "./components/PanelUser/Settings";
import Error404 from "./components/error404/Error404";

/* ------------------------------------------- */
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
/* ------------------------------------------- */

function App() {
  const { userCredentials } = useSelector((state) => state.users);

  return (
    <Routes>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signin" element={<Login /> } />
      <Route path="/signup" element={<Register />} />
      <Route path="/jobdetail/:id" element={<JobDetail />} />
      <Route path="/error404" element={<Error404 />} />

      {/* RUTAS DE FOOTER EN PROCESO */}
      <Route path="/terms-of-use" element={<UnderDevelopment />} />
      <Route path="/privacy-policies" element={<UnderDevelopment />} />
      <Route path="/cookies-policies" element={<UnderDevelopment />} />
      <Route path="/payment-policies" element={<UnderDevelopment />} />
      <Route path="/contact-us" element={<UnderDevelopment />} />

      {/* RUTAS ANIDADAS PARA EL PANEL DE PERFIL DE USUARIO */}
      <Route path="/user-panel/:id/*">
        <Route path="home" element={userCredentials ? <Home /> : <Navigate to="/home" replace />} />
        <Route path="jobdetail/:id" element={userCredentials ? <JobDetail /> : <Navigate to="/home" replace />} />
        <Route path="my-profile" element={userCredentials ? <Profile /> : <Navigate to="/home" replace />} />
        <Route path="CreateWork" element={userCredentials ? <FormWorkCreated /> : <Navigate to="/home" replace />} />
        <Route path="Edit-Work/:id" element={userCredentials ? <FormWorkCreated /> : <Navigate to="/home" replace />} />
        <Route path="WorkPublications" element={userCredentials ? <WorkPublications /> : <Navigate to="/home" replace />} />
        <Route path="settings" element={userCredentials ? <Settings /> : <Navigate to="/home" replace />} />
      </Route> 
    </Routes>
  );
}

export default App;
