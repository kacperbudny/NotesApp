import { useState, useEffect } from "react";
import backendRoutes from "../utils/constants/backend-routes";

export default function useGetNotes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(backendRoutes.notesRoute);
        const data = await response.json();
        setNotes(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  return [notes, setNotes, isLoading];
}
