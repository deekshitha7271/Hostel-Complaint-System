import './index.css'
import App from './App.jsx'
import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { AuthProvider } from "./context/AuthContext";
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App/>
  </AuthProvider>
);
