"use client";

import gsap from "gsap";
import Button from "../Button";
import s from "./ClarkVsDaniel.module.scss";

const CtaButton = ({ children }) => {
  const handleScroll = (e) => {
    e.preventDefault();
    gsap.to(window, { scrollTo: "#cta", ease: "power2" });
  };

  return (
    <Button
      variant="primary"
      href={"#cta"}
      onClick={handleScroll}
      className={s.ctaButton}
    >
      {children}
    </Button>
  );
};

export default CtaButton;
