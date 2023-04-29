"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { createClient, ErrorResponse, Photos } from "pexels";
import Modal from "./Modal";
import Photo from "./interfaces/Photo";
import { ImagesContext } from "./context";

function Home() {
  const { images, setImages } = useContext(ImagesContext);
  const [page, setPage] = useState(1);
  const [i, setI] = useState(0);
  const [clickedImage, setClickedImage] = useState<Photo | null>(null);
  const [closed, setClosed] = useState(true);

  const client = createClient(
    "uIrgrxmRhN1mWGhaSx0bASeQvqUEHQbMxiqxl4ls5MbWm4LV3b5FMo28"
  );

  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    const handleScrollDebounced = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 100);
    };

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) {
        fetchPhotos(page + 1); // use the next page number
      }
    };

    window.addEventListener("scroll", handleScrollDebounced);

    fetchPhotos(1);

    return () => {
      window.removeEventListener("scroll", handleScrollDebounced);
    };
  }, []);

  const fetchPhotos = (page: number) => {
    client.photos
      .curated({ per_page: 30, page: page })
      .then((response: Photos | ErrorResponse) => {
        if ("photos" in response) {
          const data = response.photos.map((photo) => ({
            id: photo.id,
            alt: photo.alt,
            width: photo.width,
            height: photo.height,
            src: {
              medium: photo.src.medium,
              large: photo.src.large,
              large2x: photo.src.large2x,
              original: photo.src.original,
            },
            avg_color: photo.avg_color,
          }));
          if (page === 1) {
            setImages(data as Photo[]);
          } else {
            setImages((images) => [...images, ...data] as Photo[]);
          }
          setPage((page) => page + 1);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageClick = (index: number) => {
    setClickedImage(images[index]);
    setClosed(false);
    setI(index);
  };

  return (
    <>
      <div className="photos-wrapper">
        <div className="photos">
          {images.map((image, index) => (
            <div
              className="photo-wrapper"
              key={image.id}
              onClick={() => handleImageClick(index)}
            >
              <div className="overlay"></div>
              <Image
                src={image.src.large}
                loading="lazy"
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="photo"
              />
            </div>
          ))}
        </div>
      </div>
      {clickedImage && !closed ? (
        <>
          <span
            className="arrow left-arrow"
            onClick={() => {
              setI(i - 1);
              setClickedImage(images[i - 1]);
            }}
          >
            &#8592;
          </span>
          <span
            className="arrow right-arrow"
            onClick={() => {
              setI(i + 1);
              setClickedImage(images[i + 1]);
            }}
          >
            &#8594;
          </span>
          <span
            className="close"
            onClick={() => {
              setClosed(true);
              setI(0);
            }}
          >
            &times;
          </span>
          <Modal
            {...clickedImage}
            src={{
              medium: clickedImage.src.medium,
              large2x: clickedImage.src.large2x,
              original: clickedImage.src.original,
            }}
            setClosed={setClosed}
          />
        </>
      ) : null}
    </>
  );
}

export default Home;
