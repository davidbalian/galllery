import ModalAndControlsInterface from "../interfaces/ModalAndControlsInterface";
import Modal from "./Modal";

function ModalControls({
  i,
  setI,
  clickedImage,
  setClickedImage,
  images,
  setClosed,
}: ModalAndControlsInterface) {
  return (
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
  );
}

export default ModalControls;
