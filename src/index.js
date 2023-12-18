import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import refreshToken from "./fun/refreshToken";

// import { Provider } from "react-redux";
// import store from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";
<link rel="stylesheet" href="../public/style.css"></link>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
          retry: (failureCount, error) => {
      if (error.response.status === 401) {
        refreshToken();
        return (failureCount = 1);
      } else {
        return <ErrorComponent props={error}></ErrorComponent>;
      }
    },
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
