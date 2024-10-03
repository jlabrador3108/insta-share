import { ExitIcon } from "../assets/Icons";
import EditableTable from "../components/EditableTable";
import useServer from "../services/useServerUser";

export default function AppContainer() {
  const { logOut } = useServer();
  return (
    <main>
      <header className="flex justify-end">
        
        <button onClick={logOut} className="flex">
        <label className="pt-2 cursor-pointer">Salir</label>
          <ExitIcon />
        </button>
      </header>
      <div className="flex justify-center">
        <EditableTable />
      </div>
    </main>
  );
}
