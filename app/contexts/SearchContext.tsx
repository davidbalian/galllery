"use client";

import { ReactNode, createContext, useState } from "react";
import SearchContextType from "../interfaces/SearchContextType";

const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => {},
  hasSearched: false,
  setHasSearched: () => {},
  resultsAmount: 0,
  setResultsAmount: () => {},
});

function SearchState({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [resultsAmount, setResultsAmount] = useState(0);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        hasSearched,
        setHasSearched,
        resultsAmount,
        setResultsAmount,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchState };
