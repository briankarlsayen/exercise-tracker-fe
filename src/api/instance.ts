import axios from "axios";

const timeoutMs = 30000;

export const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: timeoutMs,
  // signal: abortSignal(timeoutMs),
});
