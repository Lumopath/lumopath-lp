"use client";

import Button from "../Button";
import s from "./ClarkVsDaniel.module.scss";

const CtaButton = ({ children }) => {
  return (
    <Button variant="primary" href="#popup" className={s.ctaButton}>
      {children}
    </Button>
  );
};

export default CtaButton;
