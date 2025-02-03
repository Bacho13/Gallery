import React, { useState } from "react";
import { useSearchedPhotos } from "../customHooks/searchedPhotosHook";
import { useSearchHistory } from "../customHooks/useSearchHistory";
import { useInfiniteScroll } from "../customHooks/useInfiniteScroll";
import Modal from "../components/Modal";
import SearchHistory from "../components/SearchHistory";

const History = () => {
  const [selectedWord, setSelectedWord] = useState<string>("");
  const history = useSearchHistory();

  const {
    data: searchedData,
    fetchNextPage: fetchNextSearched,
    hasNextPage: hasNextSearched,
    isFetchingNextPage: isFetchingNextSearched,
    isLoading,
    error,
  } = useSearchedPhotos(selectedWord);

  const lastPhotoRef = useInfiniteScroll(
    isFetchingNextSearched,
    hasNextSearched,
    fetchNextSearched
  );

  const selectWord = (item: string) => {
    setSelectedWord(item);
  };

  return (
    <div className="main">
      <h2>ძებნის ისტორია</h2>
      <SearchHistory history={history} onSelect={selectWord} />

      {/* Handling Loading and Error */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading photos: {error.message}</p>}

      {/* Displaying the search results */}
      <div className="picture-container">
        {searchedData?.pages.flat().map((item, index) => {
          const isLastItem = index === searchedData.pages.flat().length - 1;
          return (
            <div key={item.id} ref={isLastItem ? lastPhotoRef : null}>
              <Modal
                id={item.id}
                likes={item.likes}
                description={item.description}
                urls={item.urls}
              />
            </div>
          );
        })}
        {isFetchingNextSearched && <p>Loading more...</p>}
      </div>
    </div>
  );
};

export default History;
