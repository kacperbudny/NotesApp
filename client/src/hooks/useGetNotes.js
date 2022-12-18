import { useState, useEffect } from "react";
import notesProvider from "@services/notesProvider";
import useHandleError from "@hooks/useHandleError";
import { useAuthContext } from "@contexts/AuthContext";

export default function useGetNotes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetched, setFetched] = useState(false);
  const handleError = useHandleError();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await notesProvider.get();
        const data = await response.json();
        setNotes(data.notes);
        setIsLoading(false);
        setFetched(true);
      } catch (error) {
        handleError(error);
      }
    };
    if (user && !fetched) {
      fetchNotes();
    }
  }, [handleError, user, fetched]);

  return { notes, setNotes, isLoading };
}
