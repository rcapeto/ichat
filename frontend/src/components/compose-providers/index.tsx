import { JSXElementConstructor, PropsWithChildren } from "react";

type Provider = JSXElementConstructor<PropsWithChildren<unknown>>;

type ComposeProvidersProps = {
  providers: Provider[];
  children: React.ReactNode;
};

export function ComposeProviders({
  children,
  providers,
}: ComposeProvidersProps) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}
