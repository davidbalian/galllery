"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createClient, ErrorResponse, Photos } from "pexels";
import Modal from "./Modal";

interface Photo {
  id: number;
  alt: string;
  width: number;
  height: number;
  src: {
    medium: string;
    large: string;
    large2x: string;
    original: string;
  };
  avg_color: string;
  photographer: string;
  photographer_url: string;
}

function Home() {
  const [images, setImages] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [clickedImage, setClickedImage] = useState<Photo | null>(null);
  const [closed, setClosed] = useState(false);

  const client = createClient(
    "uIrgrxmRhN1mWGhaSx0bASeQvqUEHQbMxiqxl4ls5MbWm4LV3b5FMo28"
  );

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) {
        fetchPhotos();
      }
    };

    window.addEventListener("scroll", handleScroll);

    fetchPhotos();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchPhotos = () => {
    client.photos
      .curated({ per_page: 20, page }) // use the next page number
      .then((response: Photos | ErrorResponse) => {
        if ("photos" in response) {
          const data = response.photos.map((photo) => ({
            id: photo.id.toString(),
            alt: photo.alt,
            width: photo.width.toString(),
            height: photo.height.toString(),
            src: {
              medium: photo.src.medium,
              large: photo.src.large,
              large2x: photo.src.large2x,
              original: photo.src.original,
            },
            avg_color: photo.avg_color,
            photographer: photo.photographer,
            photographer_url: photo.photographer_url,
          }));
          setImages((images) => [...images, ...data] as Photo[]);
          setPage((page) => page + 1);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageClick = (image: Photo) => {
    setClickedImage(image);
    setClosed(false);
  };

  return (
    <div className="photos-wrapper">
      <div className="photos">
        {images.map((image) => (
          <div
            className="photo-wrapper"
            key={image.id}
            onClick={() => handleImageClick(image)}
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
      {clickedImage && !closed && (
        <Modal
          {...clickedImage}
          src={{
            medium: clickedImage.src.medium,
            large2x: clickedImage.src.large2x,
            original: clickedImage.src.original,
          }}
          setClosed={setClosed}
        />
      )}
    </div>
  );
}

export default Home;
