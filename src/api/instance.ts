import axios from "axios";

const timeoutMs = 30000;

export const instance = axios.create({
  baseURL: "https://exercise-tracker-jmym.onrender.com/api",
  // baseURL: "http://localhost:5700/api",
  timeout: timeoutMs,
  // signal: abortSignal(timeoutMs),
});
