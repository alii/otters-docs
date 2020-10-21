import React from "react";
import { ApiDocs } from "../../types/api";

type EndpointValue = ApiDocs["endpoints"][keyof ApiDocs["endpoints"]];

type EndpointProps = {
  endpoint: EndpointValue;
  path: string;
};

type EndpointMethodProps = {
  methods: ApiDocs["endpoints"][keyof ApiDocs["endpoints"]]["methods"];
};

function ucFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const Endpoint = (props: EndpointProps) => {
  const { endpoint, path } = props;

  return (
    <div className={"endpoint"}>
      <h2>{path}</h2>
      <p>{endpoint.description}</p>
      <br />
      <h4>Methods</h4>
      <EndpointMethods methods={endpoint.methods} />
    </div>
  );
};

const EndpointMethods = (props: EndpointMethodProps) => {
  const mappedMethods = Object.entries(props.methods);
  return (
    <div>
      {mappedMethods.map((entry) => {
        const [verb, method] = entry;
        return <EndpointMethod method={method} key={verb} verb={verb} />;
      })}
    </div>
  );
};

const EndpointMethod = (props: {
  method: EndpointMethodProps[keyof EndpointMethodProps][keyof EndpointMethodProps[keyof EndpointMethodProps]];
  verb: string;
}) => {
  if (!props.method) {
    return null;
  }

  const { method, verb } = props;

  const keys = Object.entries(method).filter((entry) => {
    const [key] = entry;
    return !["description"].includes(key);
  });

  return (
    <div className={"verb-container"}>
      <b className={"verb"}>{verb.toUpperCase()}</b>: {method.description}
      <blockquote>
        {keys.map((entry) => {
          const [key, description] = entry;

          return (
            <p key={key}>
              <b>{ucFirst(key)}</b>:{" "}
              <pre>{JSON.stringify(description, null, 2)}</pre>
            </p>
          );
        })}
      </blockquote>
    </div>
  );
};
