import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from "../pages/PageNotFound";
import AppContainer from "../pages/AppContainer";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoute;
