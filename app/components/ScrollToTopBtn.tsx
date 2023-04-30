"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import "../css/scrollTopBtn.css";

function ScrollToTopBtn() {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // Define the Framer Motion variants for the button
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <motion.div
        className="scroll-top-btn"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={buttonVariants}
        transition={{ duration: 0.1 }}
        onClick={() => {
          window.scrollTo(0, 0);
          setShow(false);
        }}
      >
        <motion.p>&#8963;</motion.p>
      </motion.div>
    </>
  );
}

export default ScrollToTopBtn;
