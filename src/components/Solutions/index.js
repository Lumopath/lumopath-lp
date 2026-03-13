import React from "react";
import Image from "next/image";
import clsx from "clsx";
import * as Tabs from "@radix-ui/react-tabs";
import Heading from "../Heading";
import s from "./Solutions.module.scss";
import MarkdownText from "../MarkdownText";
import CalendarIcon from "@/assets/icons/calendar.svg";

const Solutions = ({ label, heading, description, list }) => {
  return (
    <section id="solutions" data-aos="fade" className={s.solutions}>
      <div className="container">
        <Heading
          badge={label}
          badgeColor="green"
          title={heading}
          descr={description}
        />

        <Tabs.Root
          data-aos="fade-up"
          defaultValue={list[0].label}
          className={s.solutions_inner}
        >
          <Tabs.List className={s.solutions_nav}>
            {list.map(({ label }, i) => (
              <Tabs.Trigger
                key={label + i}
                value={label}
                className={s.solutions_btn}
              >
                {label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {list.map(
            ({ label, title, description, list, picture, bottomText }, i) => (
              <Tabs.Content
                key={title + i}
                value={label}
                className={s.solutions_content}
              >
                <h3 className={clsx("h4", s.solutions_title)}>{title}</h3>

                {description && (
                  <p className={s.solutions_descr}>{description}</p>
                )}

                <div className={s.solutions_picWrapper}>
                  {picture?.url && (
                    <Image
                      src={picture.url}
                      alt={picture.alt || picture.basename}
                      width={picture.width}
                      height={picture.height}
                      className={s.solutions_pic}
                    />
                  )}

                  {!!bottomText && (
                    <div
                      data-aos="fade-up"
                      className={clsx(
                        s.solutions_bottomText,
                        s.picWrapperBottomText,
                      )}
                    >
                      <CalendarIcon />
                      <MarkdownText>{bottomText}</MarkdownText>
                    </div>
                  )}
                </div>

                {!!list.length && (
                  <ul className={s.solutions_list}>
                    {list.map(({ title, description }, j) => (
                      <li key={title + j} className={s.solutions_item}>
                        <span className={s.solutions_label}>{title}</span>
                        <div className={s.solutions_text}>{description}</div>
                      </li>
                    ))}
                  </ul>
                )}

                <div
                  data-aos="fade-up"
                  className={clsx(s.solutions_bottomText, s.listBottomText)}
                >
                  <CalendarIcon />
                  <div>
                    <MarkdownText
                      components={{ p: ({ children }) => <>{children}</> }}
                    >
                      {bottomText}
                    </MarkdownText>
                  </div>
                </div>
              </Tabs.Content>
            ),
          )}
        </Tabs.Root>
      </div>
    </section>
  );
};

export default Solutions;
