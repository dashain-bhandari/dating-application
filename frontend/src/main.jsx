import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store} from "../src/Store/app/store";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <MantineProvider
        theme={{
          colors: {
            "deep-red": ["#fce8ee", "#f7bacb", "#f28ca8", "#ed5e85", "#e83063", "#cf1749", "#a11239", "#730d29", "#730d29", "#170308"],
            second: ["#f3eef7", "#dbcbe7", "#c2a8d6", "#aa85c6", "#9262b6", "#79499d", "#5e397a", "#432957", "#281834", "#0d0811"],
          },
          primaryColor: "second",
          // fontFamily: 'Montserrat, sans-serrif',
          fontFamily: "Satoshi, sans-serif",
          // fontFamily: 'Roboto, sans-serif',
        }}
        withGlobalStyles
        withNormalizeCSS>
        <Notifications />
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </MantineProvider>

      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
