/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, ReactNode } from "react";

type RenderItemParams<Data> = {
  item: Data;
  index: number;
};

export type FlatListProps<Data> = {
  scrollClassName?: string;
  containerClassName?: string;
  onEndReached?: () => Promise<void> | void;
  data: Data[];
  renderItem: (params: RenderItemParams<Data>) => ReactNode;
  keyExtractor: (item: Data) => string;
  HeaderComponent?: ReactNode;
  FooterComponent?: ReactNode;
  ListSeparatorComponent?: FunctionComponent<any>;
  id?: string;
  reverse?: boolean;
  isLoading?: boolean;
  LoadingComponent?: FunctionComponent<any>;
  loadingQuantityItems?: number;
  EmptyComponent?: ReactNode;
  withSpinner?: boolean,
  teste?: ReactNode,
};
