import { loadDevTools } from "jira-dev-tool";
import React from "react";
import ReactDOM from "react-dom";
import { AppProviders } from "src/context";
import App from "./App";

import "antd/dist/antd.less";
import "./App.css";

loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
