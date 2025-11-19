import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "stream-chat-react/dist/css/v2/index.css";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "../context/AuthContex.jsx";
import { ChatProvider } from "../context/ChatContext.jsx";
import { BrowserRouter } from "react-router";
import { AxiosProvider } from "../context/AxiosContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AxiosProvider>
        <AuthProvider>
        <ChatProvider>
          <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
        </ChatProvider>
      </AuthProvider>
      </AxiosProvider>
    </BrowserRouter>
  </StrictMode>
);
