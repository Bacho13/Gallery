import { useState, useEffect } from "react";
import { getSearchHistory } from "../helpers/searchHistory";

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const searchHistory = getSearchHistory();
    setHistory(searchHistory);
  }, []);

  return history;
};
