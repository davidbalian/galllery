import { ErrorResponse, Photos, createClient } from "pexels";
import Photo from "../interfaces/Photo";
import { Dispatch, SetStateAction } from "react";

const client = createClient(
  "uIrgrxmRhN1mWGhaSx0bASeQvqUEHQbMxiqxl4ls5MbWm4LV3b5FMo28"
);

const fetchPhotos = (
  page: number,
  setImages: Dispatch<SetStateAction<Photo[]>>,
  images: Photo[]
) => {
  client.photos
    .curated({ per_page: 20, page: page })
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

        setImages((images) => [...images, ...data] as Photo[]);
      } else {
        console.log(response);
      }
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export default fetchPhotos;
