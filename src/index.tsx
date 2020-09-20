import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useAtom } from "jotai";
import * as atoms from "./core/atoms";

import * as serviceWorker from "./serviceWorker";
import { App } from "./App";

import "./assets/styles/index.css";

const DARK_MODE_CLASS = "aui-theme-dark";

const JotaiWrapper = () => {
  const [darkTheme] = useAtom(atoms.darkTheme);

  useEffect(() => {
    const alreadyExists = document.body.classList.contains(DARK_MODE_CLASS);
    if (darkTheme && !alreadyExists) {
      document.body.classList.add(DARK_MODE_CLASS);
    } else if (!darkTheme) {
      document.body.classList.remove(DARK_MODE_CLASS);
    }
  }, [darkTheme]);

  return <App />;
};

const Wrapper = () => {
  return (
    <Provider>
      <JotaiWrapper />
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
