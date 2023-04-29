"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: number;
  alt: string;
  width: number;
  height: number;
  src: {
    medium: string;
    large2x: string;
    original: string;
  };
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
  const [hasLoaded, setHasLoaded] = React.useState(false);
  useEffect(() => {
    document.body.style.overflowY = "hidden"; // Prevent scrolling when modal is open
    return () => {
      document.body.style.overflowY = "auto";
      setHasLoaded(false); // Allow scrolling when modal is closed
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <div
          className="modal-background"
          style={{
            background: `linear-gradient(to top right, ${avg_color}FF, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))`,
          }}
          onClick={() => {
            setClosed(true);
          }}
        ></div>

        {!hasLoaded && (
          <Image
            src={src.medium}
            alt={alt}
            width={width}
            height={height}
            style={{ backgroundColor: avg_color }}
            className="modal-image"
          />
        )}
        <Image
          src={src.large2x}
          alt={alt}
          width={width}
          height={height}
          className="modal-image"
          onLoad={() => setHasLoaded(true)}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
