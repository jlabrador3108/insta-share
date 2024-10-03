import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer } from "react-toastify";
import AppRoute from "./AppRoute";
import "../index.css";
import { useAppSelector } from "../store/hooks";
import { BrowserRouter } from "react-router-dom";
import AuthRoute from "./AuthRoute";

export const MainRouter = () => {
  const { key } = useAppSelector((state) => state.session);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={true}
        theme="light"
        transition={Flip}
        className={"z-50  "}
      />
      {key ? <AppRoute /> : <AuthRoute />}
    </BrowserRouter>
  );
};
