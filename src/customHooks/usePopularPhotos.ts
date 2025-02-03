import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPopularPhotos } from "../api"; // Import your fetch function
import { ModalDataProps } from "../interfaces"; // Import your interface

export const usePopularPhotos = () => {
  return useInfiniteQuery<ModalDataProps[], Error>({
    queryKey: ["popularPhotos"],
    queryFn: async (context) => {
      const { pageParam = 1 } = context as { pageParam?: number };
      return await fetchPopularPhotos(pageParam);
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    staleTime: 1000 * 60 * 0.5,
    initialPageParam: 1,
  });
};
