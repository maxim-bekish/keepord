import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { Provider } from "react-redux";
// import store from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
<link rel="stylesheet" href="../public/style.css"></link>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      retryDelay: 1000,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    {/* <Provider store={store}> */}

    <App />
    {/* </Provider> */}
  </QueryClientProvider>
);

reportWebVitals();
