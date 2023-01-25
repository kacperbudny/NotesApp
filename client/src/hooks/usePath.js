import { useLocation } from "react-router-dom";

export default function usePath() {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  return `/${pathname}`;
}
