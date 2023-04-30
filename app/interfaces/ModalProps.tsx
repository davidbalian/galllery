import { Dispatch, SetStateAction } from "react";

// interface for modal component props
export default interface ModalProps {
  id: number;
  alt: string;
  width: number;
  height: number;
  src: {
    medium: string;
    large2x: string;
  };
  avg_color: string;
  setClosed: Dispatch<SetStateAction<boolean>>;
}
