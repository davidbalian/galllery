import { Dispatch, SetStateAction } from "react";
import Photo from "./Photo";

export default interface ModalAndControlsInterface {
  i: number;
  setI: Dispatch<SetStateAction<number>>;
  clickedImage: Photo;
  setClickedImage: Dispatch<SetStateAction<Photo | null>>;
  images: Photo[];
  setClosed: Dispatch<SetStateAction<boolean>>;
}
