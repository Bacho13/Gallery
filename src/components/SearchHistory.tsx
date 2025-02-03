import React from "react";
import "./componentsCSS/SearchHistory.css";
import { SearchHistoryProps } from "../interfaces";

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect }) => (
  <div>
    {history.length > 0 ? (
      history.map((item, index) => (
        <button
          className="wordButton"
          key={index}
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))
    ) : (
      <p>No search history available</p>
    )}
  </div>
);

export default SearchHistory;
