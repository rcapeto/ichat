import { FunctionComponent } from "react";

type HOC<Props extends object> = (
  WrappedComponent: FunctionComponent<Props>
) => FunctionComponent<Props>;

export function compose<Props extends object>(...hocs: HOC<Props>[]) {
  return (WrappedComponent: FunctionComponent<Props>) => {
    return hocs.reduce((hoc, acc) => acc(hoc), WrappedComponent);
  };
}
