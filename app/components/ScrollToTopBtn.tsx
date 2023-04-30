"use client";

import { useEffect, useState } from "react";
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

  return (
    <div
      className={`scroll-top-btn ${show ? "show" : "hide"}`}
      onClick={() => {
        window.scrollTo(0, 0);
        setShow(false);
      }}
    >
      <p>&#8963;</p>
    </div>
  );
}

export default ScrollToTopBtn;
