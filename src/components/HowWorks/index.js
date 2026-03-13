"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Heading from "../Heading";
import Button from "../Button";
import s from "./HowWorks.module.scss";
import * as Accordion from "@radix-ui/react-accordion";
import MarkdownText from "../MarkdownText";

const HowWorks = ({
  label,
  heading,
  description,
  callout,
  calloutIcon,
  list,
  headingSecondary,
  descriptionSecondary,
  button,
  badge,
  integrations,
}) => {
  const iconedIntegrations = integrations.filter(
    (integration) => integration?.icon?.url,
  );
  const integrationsPreview = iconedIntegrations.slice(0, 20);
  const [activeTab, setActiveTab] = useState(list[0].title);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const activeTabData = useMemo(
    () => list.find((tab) => tab.title === activeTab),
    [list, activeTab],
  );

  return (
    <div className={s.how_container}>
      <section id="howworks" className={clsx("container", s.how)}>
        <Heading
          badge={label}
          badgeColor="pink"
          title={heading}
          descr={description}
        />

        <div className={s.how_tabs} data-aos="fade-up">
          <Accordion.Root
            className={s.how_tabs_list}
            defaultValue={list[0].title}
            onValueChange={handleTabClick}
          >
            {list.map(
              ({ title, description, icon, iconActive, content }, i) => (
                <div
                  key={title + i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <Accordion.Item value={title} className={s.how_tabs_item}>
                    <Accordion.Header asChild>
                      <Accordion.Trigger className={s.how_tabs_trigger}>
                        <div className={s.how_tabs_iconWrapper}>
                          {!!icon && (
                            <Image
                              src={icon.url}
                              alt={icon.alt || icon.basename}
                              width={24}
                              height={24}
                              className={s.how_tabs_icon}
                            />
                          )}
                          {!!iconActive && (
                            <Image
                              src={iconActive.url}
                              alt={iconActive.alt || iconActive.basename}
                              width={24}
                              height={24}
                              className={s.how_tabs_iconActive}
                            />
                          )}
                        </div>
                        <span className={s.how_tabs_title}>{title}</span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className={s.how_tabs_descr}>
                      <MarkdownText>{description}</MarkdownText>

                      <div className={s.how_tabs_picWrapper}>
                        <Image
                          src={content.url}
                          alt={content.alt || content.basename}
                          width={content.width}
                          height={content.height}
                        />
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </div>
              ),
            )}
          </Accordion.Root>

          <div className={s.how_tabs_tabletDescr} data-aos="fade-up">
            <MarkdownText>{activeTabData.description}</MarkdownText>
          </div>

          <div className={s.how_tabs_content} data-aos="fade-up">
            {activeTabData.content && (
              <div className={s.how_tabs_picWrapper}>
                <Image
                  src={activeTabData.content.url}
                  alt={
                    activeTabData.content.alt || activeTabData.content.basename
                  }
                  width={activeTabData.content.width}
                  height={activeTabData.content.height}
                />
              </div>
            )}
          </div>
        </div>

        <div className={s.how_callout} data-aos="fade-up">
          {!!calloutIcon && (
            <Image
              src={calloutIcon.url}
              alt={calloutIcon.alt || calloutIcon.basename}
              width={56}
              height={56}
            />
          )}
          <div className={s.how_callout_content}>
            <MarkdownText components={{ p: ({ children }) => <>{children}</> }}>
              {callout}
            </MarkdownText>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowWorks;
