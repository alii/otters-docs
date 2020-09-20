import React, { useEffect } from "react";
import useSWR from "swr";
import { ApiDocs } from "../types/api";
import { fetcher } from "../fetcher";

export const Docs = () => {
  const { data, error } = useSWR<{ API_DOCS: ApiDocs }>(
    "https://otters.app/api/docs",
    fetcher
  );

  if (!data?.API_DOCS) {
    return (
      <React.Fragment>
        <br />
        <h3>Loading</h3>
      </React.Fragment>
    );
  }

  if (error) {
    return (
      <React.Fragment>
        <h1>Could not load docs!</h1>
        <h2>Message: {error}</h2>
      </React.Fragment>
    );
  }

  const mappedEndpoints = Object.entries(data.API_DOCS.endpoints);

  return (
    <div>
      <br />
      <h3>
        Base URL: <code>{data.API_DOCS.base_url}</code>
      </h3>
      <div>
        {mappedEndpoints.map((entry) => {
          const [endpoint, endpointDescription] = entry;
          return (
            <p>
              {endpoint} – {endpointDescription.description}
            </p>
          );
        })}
      </div>
    </div>
  );
};
