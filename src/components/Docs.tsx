import React from "react";
import useSWR from "swr";
import { ApiDocs } from "../types/api";
import { fetcher } from "../fetcher";
import { Endpoint } from "./atoms/Endpoint";

export const Docs = () => {
  const { data: body, error } = useSWR<{ data: ApiDocs }>(
    "https://otters.app/api/docs",
    fetcher
  );
  
  const { data } = body;

  if (error || !body) {
    return (
      <React.Fragment>
        <h1>Could not load docs!</h1>
        <h2>Message: {error}</h2>
      </React.Fragment>
    );
  }

  const { data = false } = body;

  if (!data) {
    return (
      <React.Fragment>
        <br />
        <h3>Loading</h3>
      </React.Fragment>
    );
  }

  const mappedEndpoints = Object.entries(data.endpoints);

  return (
    <div>
      <br />
      <h3>
        Base URL: <code>{data.base_url}</code>
      </h3>
      <div>
        {mappedEndpoints.map((entry) => {
          const [path, endpoint] = entry;
          return <Endpoint key={path} path={path} endpoint={endpoint} />;
        })}
      </div>
    </div>
  );
};
