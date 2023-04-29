"use client";

import React, { FormEvent, useContext, useEffect, useState } from "react";
import { ImagesContext } from "./context";
import Photo from "./interfaces/Photo";

function Search() {
  const [search, setSearch] = useState("");
  const { images, setImages } = useContext(ImagesContext);
  const { originalImages, setOriginalImages } = useContext(ImagesContext);
  const [counter, setCounter] = useState(0);

  const handleSearch = () => {
    // if search is empty, set images to original images
    if (search === "") {
      setImages(originalImages);
      return;
    } else {
      // filter images based on search
      const filteredImages = originalImages.filter((image: Photo) => {
        return image.alt.toLowerCase().includes(search.toLowerCase());
      });

      setCounter((counter) => counter + 1);

      setImages(filteredImages);
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
        value={search}
        onClick={() => {
          counter === 0 && setOriginalImages(images);
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type="submit" className="search-submit-btn">
        &#128269;
      </button>
    </form>
  );
}

export default Search;
