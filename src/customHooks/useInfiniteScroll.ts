import { useRef, useCallback } from "react";

export const useInfiniteScroll = (
  isFetchingNext: boolean,
  hasNext: boolean,
  fetchNext: () => void
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPhotoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNext) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          fetchNext();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNext, hasNext, fetchNext]
  );

  return lastPhotoRef;
};
