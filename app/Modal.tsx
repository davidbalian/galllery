import Image from "next/image";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: number;
  alt: string;
  width: number;
  height: number;
  src: string;
  avg_color: string;
  photographer: string;
  photographer_url: string;
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({
  src,
  alt,
  width,
  height,
  avg_color,
  photographer,
  photographer_url,
  setClosed,
}: Photo) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden"; // Prevent scrolling when modal is open
    return () => {
      document.body.style.overflowY = "auto"; // Allow scrolling when modal is closed
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-dark-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        style={{
          background: `linear-gradient(to top right, ${avg_color}AF, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65))`,
        }}
      >
        <div className="modal">
          <div className="modal-header">
            <p>
              Photo by{" "}
              <a href={photographer_url} target="_blank" rel="noreferrer">
                {photographer}
              </a>
            </p>
            <span
              className="close"
              onClick={() => {
                setClosed(true);
              }}
            >
              &times;
            </span>
          </div>
          <Image src={src} alt={alt} width={width} height={height} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
