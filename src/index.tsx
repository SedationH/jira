import { loadServer, DevTools } from "jira-dev-tool";
import React from "react";
import ReactDOM from "react-dom";
import { AppProviders } from "src/context";
import App from "./App";

import "antd/dist/antd.less";
import "./App.css";

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
