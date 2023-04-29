"use client";

import React, {
  FormEvent,
  useContext,
  useEffect,
  useState,
  TouchEvent,
  FocusEvent,
} from "react";
import { ImagesContext } from "../contexts/ImagesContext";
import Photo from "../interfaces/Photo";
import { SearchContext } from "../contexts/SearchContext";

function Search() {
  const { setSearch } = useContext(SearchContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { setHasSearched } = useContext(SearchContext);
  const { images, setImages } = useContext(ImagesContext);
  const { originalImages, setOriginalImages } = useContext(ImagesContext);
  const { setResultsAmount } = useContext(SearchContext);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setResultsAmount(images.length);
  }, [images]);

  const isIOS = () => {
    if (typeof window !== "undefined") {
      const win = window as any;
      return (
        (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (navigator.userAgent === "MacIntel" &&
            navigator.maxTouchPoints > 1)) &&
        !win.MSStream
      );
    }
    return false;
  };

  const getIOSInputEventHandlers = () => {
    if (isIOS()) {
      return {};
    }

    return {
      onTouchStart: (e: TouchEvent<HTMLInputElement>) => {
        e.currentTarget.classList.add("ios-search-input");
      },
      onBlur: (e: FocusEvent<HTMLInputElement>) => {
        e.currentTarget.classList.remove("ios-search-input");
      },
    };
  };

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
        {...getIOSInputEventHandlers()}
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
