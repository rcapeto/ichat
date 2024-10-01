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
  HeaderComponent?: FunctionComponent<unknown>;
  FooterComponent?: FunctionComponent<unknown>;
  ListSeparatorComponent?: FunctionComponent<unknown>;
  id?: string;
  reverse?: boolean;
  isLoading?: boolean;
  LoadingComponent?: FunctionComponent<unknown>;
  loadingQuantityItems?: number;
  EmptyComponent?: FunctionComponent<unknown>;
};
