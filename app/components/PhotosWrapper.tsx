import Image from "next/image";
import PhotosWrapper from "../interfaces/PhotosWrapper";

function PhotosWrapper({
  images,
  handleImageClick,
  hasSearched,
  resultsAmount,
  search,
}: PhotosWrapper) {
  return (
    <div className="photos-wrapper">
      {hasSearched && (
        <p className="search-query">
          {resultsAmount > 0 ? resultsAmount : "No"} results for search{" "}
          <strong>{`"${search}"`}</strong>
        </p>
      )}
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
  );
}

export default PhotosWrapper;
