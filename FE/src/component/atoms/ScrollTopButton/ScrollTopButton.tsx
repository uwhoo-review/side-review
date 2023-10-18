import styled from "./style";
import { useEffect, useState } from "react";

const ScrollTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const scrollToTop = () => {
    const scrollDiv = document.querySelector(".scroll-area");
    scrollDiv?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollDiv = document.querySelector(".scroll-area");
    console.log(scrollDiv);
    const handleShowButton = () => {
      (scrollDiv?.scrollTop || 0) > 100 ? setShowButton(true) : setShowButton(false);
    };

    scrollDiv?.addEventListener("scroll", handleShowButton);
    return () => {
      scrollDiv?.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <>
      {showButton && (
        <div css={styled.wrapper} onClick={scrollToTop}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
          >
            <circle cx="29" cy="29" r="29" fill="#6D6ADA" />
            <path
              d="M27.4881 21.7457C28.2857 20.8248 29.7143 20.8248 30.5119 21.7457L37.3924 29.6907C38.5141 30.986 37.594 33 35.8805 33H22.1195C20.406 33 19.4859 30.986 20.6076 29.6907L27.4881 21.7457Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default ScrollTopButton;
