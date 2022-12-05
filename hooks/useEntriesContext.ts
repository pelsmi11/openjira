import React, { useContext } from "react";
import { EntriesContext } from "../context/entries";

export const useEntriesContext = () => {
  return useContext(EntriesContext);
};
