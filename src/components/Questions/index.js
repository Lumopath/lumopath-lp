"use client";

import React, { useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import s from "./Questions.module.scss";
import Heading from "../Heading";
import MarkdownText from "../MarkdownText";
import clsx from "clsx";

const Questions = ({ label, heading, cards }) => {
  const [activeTab, setActiveTab] = useState(cards[0].name);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const activeTabData = useMemo(
    () => cards.find((tab) => tab.name === activeTab),
    [cards, activeTab],
  );

  return (
    <section className={clsx("container", s.questions)}>
      <Heading badge={label} title={heading} badgeColor="pink" />
      <div className={s.questions_tabs}>
        <Accordion.Root
          className={s.questions_tabs_list}
          defaultValue={cards[0].name}
          onValueChange={handleTabClick}
        >
          {cards.map(({ name, body }, i) => (
            <div key={name + i} data-aos="fade-up" data-aos-delay={i * 100}>
              <Accordion.Item value={name} className={s.questions_tabs_item}>
                <Accordion.Header asChild>
                  <Accordion.Trigger className={s.questions_tabs_trigger}>
                    {name}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                  className={clsx(s.questions_tabs_descr, s.accordionText)}
                >
                  <MarkdownText>{body}</MarkdownText>
                </Accordion.Content>
              </Accordion.Item>
            </div>
          ))}
        </Accordion.Root>

        <div
          data-aos="fade-up"
          className={clsx(s.questions_tabs_descr, s.contentText)}
        >
          <MarkdownText>{activeTabData.body}</MarkdownText>
        </div>
      </div>
    </section>
  );
};

export default Questions;
