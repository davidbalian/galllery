import Image from "next/image";
import PhotosWrapper from "../interfaces/PhotosWrapper";
import "../css/photos.css";

// photos wrapped div + all the images
function PhotosWrapper({
  images,
  handleImageClick,
  hasSearched,
  resultsAmount,
  search,
}: PhotosWrapper) {
  return (
    <div className="photos-wrapper">
      {/* if the user has made a search, show their search query and amount of results*/}
      {hasSearched && (
        <p className="search-query">
          {resultsAmount > 0 ? resultsAmount : "No"} results for search{" "}
          <strong>{`"${search}"`}</strong>
        </p>
      )}
      <div className="photos">
        {/* map all images based on images array */}
        {images.map((image, index) => (
          <div
            className="photo-wrapper"
            key={image.id}
            onClick={() => handleImageClick(index)}
          >
            {/* dark overlay on hover */}
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
  );
}

export default PhotosWrapper;
