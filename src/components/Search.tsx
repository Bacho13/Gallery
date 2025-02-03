import React, { useState, useEffect } from "react";
import "./componentsCSS/Search.css";
import { saveSearchToLocalStorage } from "../helpers/searchHistory";
import { InputLoggerProps } from "../interfaces";

const InputLogger: React.FC<InputLoggerProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    if (debouncedInputValue) {
      onSearch(debouncedInputValue); //
      saveSearchToLocalStorage(debouncedInputValue);
    }
  }, [debouncedInputValue, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setDebouncedInputValue(inputValue);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="ძებნა"
      />
    </div>
  );
};

export default InputLogger;
