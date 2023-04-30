"use client";

import React, { FormEvent, useContext, useEffect, useState } from "react";
import { ImagesContext } from "../contexts/ImagesContext";
import Photo from "../interfaces/Photo";
import { SearchContext } from "../contexts/SearchContext";

function Search() {
  // state from SearchContext
  const { setSearch } = useContext(SearchContext);
  const { setHasSearched } = useContext(SearchContext);
  const { setResultsAmount } = useContext(SearchContext);

  // state from ImagesContext
  const { images, setImages } = useContext(ImagesContext);
  const { originalImages, setOriginalImages } = useContext(ImagesContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setResultsAmount(images.length);
  }, [images]);

  const handleSearch = () => {
    // if search is empty, set images to original images
    if (searchQuery === "") {
      setImages(originalImages);
      setHasSearched(false);
      return;
    } else {
      // filter images based on search
      const filteredImages = originalImages.filter((image: Photo) => {
        return image.alt.toLowerCase().includes(searchQuery.toLowerCase());
      });

      setCounter((counter) => counter + 1);
      setHasSearched(true);
      setImages(filteredImages);
      setSearch(searchQuery);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // prevents refresh
    e.preventDefault();

    handleSearch();
  };

  return (
    <form className="search-form" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={searchQuery}
        onClick={() => {
          counter === 0 && setOriginalImages(images);
        }}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <button type="submit" className="search-submit-btn">
        &#128269;
      </button>
    </form>
  );
}

export default Search;
