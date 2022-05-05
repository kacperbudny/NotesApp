import { useState, useEffect } from "react";
import { getNotes } from "@services/notesApi";

export default function useGetNotes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await getNotes();
        const data = await response.json();
        setNotes(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, []);

  return [notes, setNotes, isLoading];
}
