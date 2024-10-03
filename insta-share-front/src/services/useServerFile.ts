import { useState } from "react";
import { toast } from "react-toastify";
import { store } from "../store/root";

const useServerFile = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);

  const loadFile = async (body: any) => {
    setIsFetching(true);

    const session = store?.getState().session;
    const key = session.key;

    const url = import.meta.env.VITE_API_URL + "/file";
    try {
      const formData = new FormData();
      formData.append("file", body);

      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
        },
        body: formData,
      });

      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);

      const result = await resp.json();

      setFiles([...files, result]);

      toast.success("Archivo subido");
    } catch (e) {
      console.log(e);
      toast.error("Error al subir archivo");
    } finally {
      setIsFetching(false);
    }
  };

  const getFiles = async () => {
    setIsFetching(true);
    const session = store?.getState().session;
    const key = session?.key;
    const url = import.meta.env.VITE_API_URL + "/file";
    try {
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);

      const result = await resp.json();

      setFiles(result.items);
    } catch (e) {
      console.log(e);
      toast.error("Error al cargar los archivos");
    } finally {
      setIsFetching(false);
    }
  };

  const updateFile = async (data: any) => {
    setIsFetching(true);
    const url = import.meta.env.VITE_API_URL + "/file/" + data.id;
    try {
      const resp = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: data.name }),
      });

      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);

      const result = await resp.json();

      setFiles((currentFiles: any) => {
        const updatedFiles = currentFiles.map((file: any) =>
          file.id === result.item.id ? { ...file, name: data.name } : file
        );
        return updatedFiles;
      });

      toast.success("Archivo modificado");
    } catch (e) {
      console.log(e);
      toast.error("Error al modificar archivo");
    } finally {
      setIsFetching(false);
    }
  };

  const downloadZip = async (data: any) => {
    setIsFetching(true);
    const url = data.zipUrl;
    try {
      const link = document.createElement("a");
      link.href = url;
      link.style.display = "none";
      document.body.appendChild(link);

      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (e) {
      console.log(e);
      toast.error("Error al obtener zip");
    } finally {
      setIsFetching(false);
    }
  };

  return {
    loadFile,
    isFetching,
    files,
    getFiles,
    updateFile,
    downloadZip,
  };
};

export default useServerFile;
