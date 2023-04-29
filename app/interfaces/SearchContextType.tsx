import { Dispatch, SetStateAction } from "react";

export default interface SearchContextType {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  hasSearched: boolean;
  setHasSearched: Dispatch<SetStateAction<boolean>>;
  resultsAmount: number;
  setResultsAmount: Dispatch<SetStateAction<number>>;
}
