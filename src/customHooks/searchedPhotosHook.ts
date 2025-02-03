import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPhoto } from "../api";
import { ModalDataProps } from "../interfaces";

export const useSearchedPhotos = (query: string) => {
  return useInfiniteQuery<ModalDataProps[], Error>({
    queryKey: ["searchedPhotos", query],
    queryFn: async ({ queryKey, pageParam = 1 }) => {
      const [, actualQuery] = queryKey;
      return (await searchPhoto(
        actualQuery as string,
        pageParam as number // Type assertion here
      )) as ModalDataProps[];
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: Boolean(query),
    staleTime: 1000 * 60 * 0.5,
  });
};
