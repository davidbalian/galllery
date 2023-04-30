"use client";

import { useContext, useEffect, useState } from "react";
import Photo from "./interfaces/Photo";
import { ImagesContext } from "./contexts/ImagesContext";
import { SearchContext } from "./contexts/SearchContext";
import PhotosWrapper from "./components/PhotosWrapper";
import fetchPhotos from "./functions/fetchPhotos";
import ModalAndControls from "./components/ModalAndControls";

function Home() {
  const { images, setImages } = useContext(ImagesContext);
  const { hasSearched } = useContext(SearchContext);
  const { search } = useContext(SearchContext);
  const [page, setPage] = useState(Math.floor(Math.random() * 9) + 2);
  const [i, setI] = useState(0);
  const [clickedImage, setClickedImage] = useState<Photo | null>(null);
  const [closed, setClosed] = useState(true);
  const { resultsAmount } = useContext(SearchContext);

  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    const handleScrollDebounced = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 50);
    };

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 400) {
        setPage((page) => page + 1); // increment page number
      }
    };

    window.addEventListener("scroll", handleScrollDebounced);

    return () => {
      window.removeEventListener("scroll", handleScrollDebounced);
    };
  }, []);

  useEffect(() => {
    !hasSearched && fetchPhotos(page, setImages, images);
  }, [page]);

  const handleImageClick = (index: number) => {
    setClickedImage(images[index]);
    setClosed(false);
    setI(index);
  };

  return (
    <>
      <PhotosWrapper
        images={images}
        handleImageClick={handleImageClick}
        hasSearched={hasSearched}
        resultsAmount={resultsAmount}
        search={search}
      />
      {clickedImage && !closed ? (
        <ModalAndControls
          i={i}
          setI={setI}
          clickedImage={clickedImage}
          setClickedImage={setClickedImage}
          setClosed={setClosed}
          images={images}
        />
      ) : null}
    </>
  );
}

export default Home;
