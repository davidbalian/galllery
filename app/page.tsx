"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

type UnsplashImage = {
  id: string;
  alt_description: string;
  width: number;
  height: number;
  urls: {
    small: string;
  };
};

function Home() {
  const [images, setImages] = useState<UnsplashImage[]>([]);

  const accessKey = "A1gpClCtLT7VT-OiXKw8UjbXmoXo-fDAcSMeHSPAdmg";
  const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=30`;

  useEffect(() => {
    fetch(unsplashApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="photos-wrapper">
      <div className="photos">
        {images.map((image) => (
          <div className="photo-wrapper" key={image.id}>
            <div className="overlay"></div>
            <Image
              src={image.urls.small}
              loading="lazy"
              alt={image.alt_description}
              width={image.width}
              height={image.height}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
