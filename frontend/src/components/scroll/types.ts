import { PropsWithChildren, UIEvent } from "react";

export type ScrollProps = PropsWithChildren<{
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  className?: string;
}>;
