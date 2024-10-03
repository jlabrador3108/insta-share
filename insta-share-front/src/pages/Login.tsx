import { useForm } from "react-hook-form";
import { useState } from "react";
import RegisterUser from "./RegisterUser";
import Input from "../components/Input";
import { Modal } from "../components/Modal";
import Logo from "../assets/react.svg";
import useServer from "../services/useServerUser";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { control, handleSubmit } = useForm();
  const { logIn } = useServer();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (values: Record<string, string>) => {
    const response = await logIn({ ...values });
    if (response?.success) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-slate-100 ">
        <div className="sm:w-1/3 xl:w-1/5   ">
          <div className="mx-auto flex justify-center">
            <img className="h-40 w-auto" src={Logo} alt="Logo" />
          </div>

          <h2 className="text-center text-xl font-bold text-slate-900">
            Inicia sesión
          </h2>
          <form
            className="h-32 space-y-6 mt-5 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
              <div>
                <Input
                  name="username"
                  control={control}
                  rules={{ required: "Campo requerido" }}
                  label="Usuario"
                />
              </div>
              <div className="relative">
                <Input
                  name="password"
                  control={control}
                  rules={{ required: "Campo requerido" }}
                  label="Contraseña"
                  type={"text"}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center rounded-md border justify-center border border-slate-600 border-transparent bg-slate-600 px-3 py-2 text-sm font-medium text-white shadow-sm focus:outline-none gap-2 hover:shadow-md "
              >
                Iniciar
              </button>
            </div>
          </form>

          <footer className="relative top-28 flex gap-x-12  justify-between w-full">
            <button
              onClick={() => setShow(true)}
              className="text-xl font-normal hover:underline"
            >
              ¿No tienes una cuenta? Regístrese.
            </button>
          </footer>
        </div>
      </div>
      {show && (
        <Modal isOpen={show} setIsOpen={setShow} size="lg" title="Crear cuenta">
          <RegisterUser setIsOpen={setShow} />
        </Modal>
      )}
    </>
  );
}
