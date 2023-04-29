import { Dispatch, SetStateAction } from "react";
import Photo from "./Photo";

export default interface ImagesContextType {
  originalImages: Photo[];
  setOriginalImages: Dispatch<SetStateAction<Photo[]>>;
  images: Photo[];
  setImages: Dispatch<SetStateAction<Photo[]>>;
}
