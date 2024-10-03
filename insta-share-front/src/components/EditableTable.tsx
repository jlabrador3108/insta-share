import { useEffect } from "react";
import RowTable from "./RowTable";
import useServerFile from "../services/useServerFile";
import FileUpload from "./FileUpload";

export default function EditableTable() {
  const { files, getFiles, updateFile, loadFile } = useServerFile();

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <main className="flex flex-col min-w-max w-4/6 border-separate">
      <FileUpload loadFile={loadFile} />
      <footer className="text-center bg-slate-500 text-white text-xl">
        Seleccione en el nombre para modificar el mismo
      </footer>
      <table className="">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-4 text-sm font-semibold tracking-wide text-gray-500 uppercase w-1/4">
              Nombre
            </th>
            <th className="p-4 text-sm font-semibold tracking-wide text-gray-500 uppercase w-1/4">
              Estado
            </th>
            <th className="p-4 text-sm font-semibold tracking-wide text-gray-500 uppercase w-1/4">
              Tamaño
            </th>
            <th className="p-4 text-sm font-semibold tracking-wide text-gray-500 uppercase w-1/4">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((row: any) => (
            <RowTable key={row.id} row={row} updateFile={updateFile} />
          ))}
        </tbody>
      </table>
    </main>
  );
}
