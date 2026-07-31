// Central place for the backend API URL.
// Automatically uses localhost when running locally,
// and your deployed backend URL otherwise.
//
// IMPORTANT: after you deploy the backend to Vercel, replace the
// placeholder below with your real backend project's URL
// (e.g. https://my-portfolio-api.vercel.app).

const API_BASE = (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
)
    ? "http://localhost:5000"
    : "https://REPLACE-WITH-YOUR-BACKEND-URL.vercel.app";