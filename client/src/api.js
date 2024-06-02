import axios from "axios";
import { languageVersions } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (sourceCode, language) => {
  const response = await API.post("/execute", {
    language: language,
    version: languageVersions[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
