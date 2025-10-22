export const config = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:4002",
  WS_URL: import.meta.env.VITE_WS_URL || "ws://localhost:4002",
} as const;
