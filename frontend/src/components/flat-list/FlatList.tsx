import { Scroll } from "@/components/scroll";
import { cn } from "@/lib/utils";
import { Fragment, UIEvent } from "react";
import { FlatListProps } from "./types";

export function FlatList<Data>(props: FlatListProps<Data>) {
  const {
    data,
    keyExtractor,
    renderItem,
    FooterComponent,
    HeaderComponent,
    ListSeparatorComponent,
    containerClassName,
    scrollClassName,
    id,
    onEndReached,
    reverse = false,
    LoadingComponent,
    isLoading = false,
    loadingQuantityItems = 5,
    EmptyComponent,
  } = props;

  async function onScroll(event: UIEvent<HTMLDivElement>) {
    const element = event.target as HTMLDivElement;
    const currentPosition = element.scrollTop;
    const totalHeight = element.scrollHeight - element.clientHeight;

    if (currentPosition >= totalHeight) {
      await onEndReached?.();
    }
  }

  const isEmptyData = data.length === 0;

  return (
    <div
      className={cn(
        "flex-1 flex flex-col gap-2 overflow-hidden",
        containerClassName
      )}
      id={id}
    >
      {HeaderComponent && <HeaderComponent />}

      <Scroll
        className={cn(
          "flex-1",
          scrollClassName,
          reverse ? "flex-col-reverse" : "flex-col"
        )}
        onScroll={onScroll}
      >
        {data.map((item, index) => (
          <Fragment key={keyExtractor(item)}>
            {renderItem({ item, index })}
            {ListSeparatorComponent && <ListSeparatorComponent />}
          </Fragment>
        ))}

        {isEmptyData && EmptyComponent && <EmptyComponent />}

        {isLoading &&
          LoadingComponent &&
          Array.from({ length: loadingQuantityItems }).map((_, index) => (
            <LoadingComponent key={index.toString()} />
          ))}
      </Scroll>

      {FooterComponent && <FooterComponent />}
    </div>
  );
}
