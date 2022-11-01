import { useState, useEffect } from "react";
import { getNotes } from "@services/notesApi";
import useHandleError from "@hooks/useHandleError";
import useAuth from "@hooks/useAuth";

export default function useGetNotes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetched, setFetched] = useState(false);
  const handleError = useHandleError();
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await getNotes();
        const data = await response.json();
        setNotes(data);
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

  return [notes, setNotes, isLoading];
}
