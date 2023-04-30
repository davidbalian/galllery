"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalProps from "../interfaces/ModalProps";
import "../css/modal.css";
import "../globals.css";

const Modal = ({
  src,
  alt,
  width,
  height,
  avg_color,
  setClosed,
}: ModalProps) => {
  // state to check whether the large image has loaded
  const [hasLoaded, setHasLoaded] = useState(false);

  // background gradient for modal
  const modalBg = `linear-gradient(to top right, ${avg_color}FF, 
    rgba(255, 255, 255, 0.9), 
    rgba(255, 255, 255, 0.9), 
    rgba(255, 255, 255, 0.9))`;

  // prevent scrolling on mobile when modal is open
  const preventScroll = (event: TouchEvent) => {
    event.preventDefault();
  };

  // prevent scrolling on all devices when modal is open
  const preventScrollOnOpen = () => {
    // on pcs
    document.body.style.overflowY = "hidden";

    // on mobile
    document.body.addEventListener("touchmove", preventScroll, {
      passive: false,
    } as EventListenerOptions);
  };

  // allow scrolling on all devices when modal is closed
  const allowScrollOnClose = () => {
    // on pcs
    document.body.style.overflowY = "auto";

    // on mobile
    document.body.removeEventListener("touchmove", preventScroll, {
      passive: false,
    } as EventListenerOptions);
    setHasLoaded(false);
  };

  useEffect(() => {
    preventScrollOnOpen();
    return () => {
      allowScrollOnClose();
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="modal-background"
          style={{
            background: modalBg,
          }}
          onClick={() => {
            setClosed(true);
          }}
        ></div>

        {/* show low res image while large image is loading*/}
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
