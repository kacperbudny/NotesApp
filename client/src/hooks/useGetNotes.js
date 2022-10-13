import { useState, useEffect } from "react";
import { getNotes } from "@services/notesApi";
import useHandleError from "./useHandleError";

export default function useGetNotes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleError = useHandleError();

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await getNotes();
        const data = await response.json();
        setNotes(data);
        setIsLoading(false);
      } catch (error) {
        handleError(error);
      }
    };
    fetchNotes();
  }, [handleError]);

  return [notes, setNotes, isLoading];
}
