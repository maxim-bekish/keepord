import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import refreshToken from "./fun/refreshToken";

import { QueryClient, QueryClientProvider } from "react-query";

<link rel="stylesheet" href="../public/style.css"></link>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error.response.status === 401) {
          refreshToken();
          return (failureCount = 1);
        
        }
      },
      retryDelay: 1000,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

reportWebVitals();
