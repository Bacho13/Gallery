import React, { useState, useEffect } from "react";
import "../pageCSS/Main.css";
import Modal from "../components/Modal";
import Search from "../components/Search";
import { usePopularPhotos } from "../customHooks/usePopularPhotos";
import { useSearchedPhotos } from "../customHooks/searchedPhotosHook";
import { useInfiniteScroll } from "../customHooks/useInfiniteScroll";

function Main() {
  const [searchedWord, setSearchedWord] = useState<string>("");

  // Always call both hooks
  const {
    data: popularData,
    fetchNextPage: fetchNextPopular,
    hasNextPage: hasNextPopular,
    isFetchingNextPage: isFetchingNextPopular,
  } = usePopularPhotos();

  const {
    data: searchedData,
    fetchNextPage: fetchNextSearched,
    hasNextPage: hasNextSearched,
    isFetchingNextPage: isFetchingNextSearched,
  } = useSearchedPhotos(searchedWord);

  // Choose the appropriate data based on searchedWord
  const data = searchedWord ? searchedData : popularData;
  const fetchNextPage = searchedWord ? fetchNextSearched : fetchNextPopular;
  const hasNextPage = searchedWord ? hasNextSearched : hasNextPopular;
  const isFetchingNextPage = searchedWord
    ? isFetchingNextSearched
    : isFetchingNextPopular;

  const lastPhotoRef = useInfiniteScroll(
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  );

  const handleSearchedWord = (word: string) => {
    setSearchedWord(word); // Set the searched word when input changes
  };

  useEffect(() => {
    console.log("Searched word from main:", searchedWord);
  }, [searchedWord]);

  return (
    <div className="main">
      <Search onSearch={handleSearchedWord} />
      <div className="picture-container">
        {data?.pages.flat().map((item, index) => {
          const isLastItem = index === data.pages.flat().length - 1;
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
      </div>
      {isFetchingNextPage && <p>Loading more photos...</p>}
    </div>
  );
}

export default Main;
