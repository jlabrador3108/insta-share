import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { Button } from "@tremor/react";
import useServer from "../services/useServerUser";
import { LoadingSpin } from "../assets/Icons";

export default function RegisterUser({ setIsOpen }: { setIsOpen: any }) {
  const { handleSubmit, control } = useForm();

  const { newUser, isFetching } = useServer();

  const onSubmit = async (data: any) => {
    const response = await newUser({ ...data });
    if (response?.success) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl px-5 py-3 mx-auto">
        <header className="fixed inset-x-0 top-0 left-0 "></header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="space-y-12">
            <section className="border-b border-gray-900/10 pb-12">
              <section className="mt-4 flex flex-col gap-x-6 gap-y-8 sm:grid-cols-6 max-w-3xl">
                <section className="grid grid-cols-1 w-full gap-x-5 text-center">
                  <article className="max-w-lg flex flex-col gap-y-2 text-center">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900 flex items-center justify-center"
                    >
                      Usuario
                    </label>
                    <div className="mt-2 relative">
                      <Input
                        control={control}
                        rules={{ required: "Campo requerido" }}
                        name="username"
                        placeholder="jlabrador"
                        type="text"
                      />
                    </div>
                  </article>
                  <article className="mt-6 max-w-lg flex flex-col gap-2">
                    <span className="block text-sm font-normal leading-6 text-gray-900">
                      Contraseña
                    </span>
                    <Input
                      name="password"
                      type="text"
                      control={control}
                      rules={{ required: "Campo requerido" }}
                      placeholder="Contraseña..."
                    />
                  </article>
                </section>
              </section>
            </section>
          </section>
          <aside className="mt-6 flex items-center justify-end gap-x-6 absolute bottom-6 right-32">
            <Button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex gap-x-4 "
            >
              {isFetching ? <LoadingSpin /> : "Crear"}
            </Button>
          </aside>
        </form>
      </div>
    </>
  );
}
