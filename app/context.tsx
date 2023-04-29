"use client";

import { ReactNode, createContext, useState } from "react";
import Photo from "./interfaces/Photo";
import ImagesContextType from "./interfaces/ImagesContextInterface";

const ImagesContext = createContext<ImagesContextType>({
  originalImages: [],
  setOriginalImages: () => {},
  images: [],
  setImages: () => {},
});

function Context({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Photo[]>([]);
  const [originalImages, setOriginalImages] = useState<Photo[]>([]);

  return (
    <ImagesContext.Provider
      value={{ originalImages, setOriginalImages, images, setImages }}
    >
      {children}
    </ImagesContext.Provider>
  );
}

export { ImagesContext, Context };
