type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

export const fetcher = <Body = any>(
  ...args: ArgumentTypes<typeof window["fetch"]>
) => {
  return fetch(...args).then((res) => res.json()) as Promise<Body>;
};
