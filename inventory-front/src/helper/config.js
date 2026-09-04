
// Base URL is read from the environment so it can differ between
// local dev, staging, and production without editing source code.
// Set VITE_API_URL in a .env file at the project root (see .env.example).
export const BaseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
