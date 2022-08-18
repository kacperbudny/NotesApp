import NotesContext from "@contexts/NotesContext";
import { useContext } from "react";

export default function useNotes() {
  return useContext(NotesContext);
}
