import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "rc-slider/assets/index.css";
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { API_URL } from "api/config";

const Root = () => {
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    // Fetch client ID from server
    axios
      .get(`${API_URL}/api/google-client-id`)
      .then((response) => {
        setClientId(response.data);
      })
      .catch((error) => {
        console.error("Error fetching client ID:", error);
      });
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId? clientId: "abvc"}>
      <App />
    </GoogleOAuthProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Root />);
