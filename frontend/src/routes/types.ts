import { FunctionComponent } from "react";

export type AppRoute = {
  isPrivate?: boolean;
  path: string;
  Component: FunctionComponent;
};
