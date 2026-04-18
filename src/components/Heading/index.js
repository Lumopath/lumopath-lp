import React from "react";
import clsx from "clsx";
import MarkdownText from "../MarkdownText";
import Badge from "../Badge";
import s from "./Heading.module.scss";

const Heading = ({
  badge,
  badgeColor,
  title,
  descr,
  className,
  markdownComponents,
}) => {
  return (
    <div className={clsx(s.heading, className)}>
      {badge && (
        <Badge data-aos="fade-up" className={s.badge} variant={badgeColor}>
          {badge}
        </Badge>
      )}
      <h2 data-aos="fade-up" data-aos-delay={100}>
        <MarkdownText
          components={{
            p: ({ children }) => <>{children}</>,
            ...markdownComponents,
          }}
        >
          {title}
        </MarkdownText>
      </h2>
      <div data-aos="fade-up" data-aos-delay={200} className="lead">
        {descr && (
          <MarkdownText
            components={{
              p: ({ children }) => <>{children}</>,
              ...markdownComponents,
            }}
          >
            {descr}
          </MarkdownText>
        )}
      </div>
    </div>
  );
};

export default Heading;
