import React from "react";
import { Hero } from "./components/organisms/Hero";
import { Docs } from "./components/Docs";

export const App = () => {
  return (
    <React.Fragment>
      <Hero />
      <Docs />
    </React.Fragment>
  );
};
