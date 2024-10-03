import { useState } from "react";
import { toast } from "react-toastify";
import { setKeys } from "../store/slice/sessionSlice";
import { useAppDispatch } from "../store/hooks";

const useServer = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const logIn = async (data: Record<string, string>) => {
    setIsFetching(true);
    const url = import.meta.env.VITE_API_URL + "/user/login";
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);

      const result = await resp.json();

      dispatch(setKeys(result.token));

      return { success: true, data: result.token };
    } catch (e) {
      console.log(e);
      toast.error("Credenciales invalidas");
    } finally {
      setIsFetching(false);
    }
  };

  const newUser = async (data: Record<string, string>) => {
    setIsFetching(true);
    const url = import.meta.env.VITE_API_URL + "/user";
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (resp.status === 409) toast.error("Ya existe ese nombre de usuario");;

      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
      toast.success("Usuario creado");

      return { success: true };
    } catch (e) {
      console.log(e);
      toast.error("Error al crear usuario");
    } finally {
      setIsFetching(false);
    }
  };

  const logOut = async () => {
    try {
      dispatch(setKeys(null));
      toast.success("Usted ha salido del sistema");
    } catch (e) {
      console.log(e);
      toast.error("Error");
    }
  };

  return {
    logIn,
    isFetching,
    newUser,
    logOut,
  };
};

export default useServer;
