import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@tremor/react";

type size = "lg" | "xl" | "2xl" | "3xl" | "4xl";
interface MyModalProps {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setIsOpen: Function;
  children: React.ReactNode;
  title?: string;
  twoButtons?: boolean;
  size?: size;
}

export function Modal({
  isOpen,
  setIsOpen,
  children,
  title = "Información",
  twoButtons = false,
  size = "xl",
}: MyModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={isOpen}
          >
            <div className="fixed inset-0 bg-black/25 " />
          </Transition>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center  p-4 text-center ">
              <Transition
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                show={isOpen}
              >
                <DialogPanel
                  className={`w-full  max-w-${size} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <DialogTitle
                    as="h1"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    {title}
                    <hr />
                  </DialogTitle>
                  <article>
                    <div className="my-2">{children}</div>
                    <aside className=" flex gap-3 mt-3 justify-end">
                      {twoButtons && (
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Aceptar
                        </button>
                      )}
                      <Button
                        type="button"
                        variant="secondary"
                        color="red"
                        onClick={closeModal}
                      >
                        Cerrar
                      </Button>
                    </aside>
                  </article>
                </DialogPanel>
              </Transition>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
