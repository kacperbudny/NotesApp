import { useState, useEffect } from "react";

export default function useGetNotes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/notes");
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
