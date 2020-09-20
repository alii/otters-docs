export const ExampleApi: ApiDocs = {
  base_url: "https://otters.app/api",
  endpoints: {
    "/users/:id": {
      description: "Routes surrounding the user model",
      methods: {
        get: {
          description: "Fetches the user from the id",
        },
        put: {
          description: "Inserts a new user to the database",
          body: {
            values: "to insert",
          },
        },
        patch: {
          description: "Updates the user",
          headers: {
            Authorization: "The authorization token",
          },
          body: {
            values: "to update",
          },
        },
      },
    },
  },
};

export interface ApiDocs {
  base_url: string;
  endpoints: Record<string, EndpointDoc>;
}

interface EndpointDoc {
  description: string;
  methods: Partial<
    {
      [k in "post" | "get" | "patch" | "put" | "delete"]: {
        description: string;
        body?:
          | Record<string, string | boolean | number | "boolean" | "number">
          | string
          | number
          | boolean;
        params?: Record<string, string>;
        example_url?: string;
        headers?: Record<string, string>;
      };
    }
  >;
}
