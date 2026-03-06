import React from "react";
import s from "./ProductDefinition.module.scss";
import MarkdownText from "../MarkdownText";
import clsx from "clsx";

const ProductDefinition = ({ content }) => {
  return (
    <section className={clsx("container", s.productDefinition)}>
      <h2 data-aos="fade-up" className={s.productDefinition_title}>
        <MarkdownText>{content}</MarkdownText>
      </h2>
    </section>
  );
};

export default ProductDefinition;
