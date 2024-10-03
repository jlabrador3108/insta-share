import { useState } from "react";
import useServerFile from "../services/useServerFile";

export default function RowTable({
  row,
  updateFile,
}: {
  row: any;
  updateFile: any;
}) {
  const { downloadZip } = useServerFile();
  const [name, setName] = useState(row.name);

  const [disable, setDisable] = useState(true);

  const handleInputChange = (event: any) => {
    const newName = event.target.value;
    setName(newName);
    if (newName !== row.name) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleClick = () => {
    updateFile({ name: name, id: row.id });
  };

  const handleClickZip = () => {
    downloadZip({ zipUrl: row.zipUrl });
  };

  return (
    <tr>
      <td className="border px-4 py-2 justify-center text-center">
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          className="text-sm text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
        />
      </td>
      <td className="border px-4 py-2 justify-center text-center">
        <p>Cargado</p>
      </td>
      <td className="border px-4 py-2 text-center">
        <p>{row.size.toFixed(3)} MB</p>
      </td>
      <td className="border px-4 py-2 flex items-center justify-center space-x-4">
        <button
          disabled={disable}
          className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
          onClick={handleClick}
        >
          Editar
        </button>
        <button
          disabled={!row.zipUrl}
          className="w-full px-4 py-2 bg-amber-700 hover:bg-amber-800 rounded text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
          onClick={handleClickZip}
        >
          Descargar zip
        </button>
      </td>
    </tr>
  );
}
