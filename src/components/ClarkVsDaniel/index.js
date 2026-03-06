import React from "react";

import s from "./ClarkVsDaniel.module.scss";
import clsx from "clsx";
import Heading from "../Heading";
import Image from "next/image";
import MarkdownText from "../MarkdownText";
import CtaButton from "./ctaButton";
import RevealTable from "./RevealTable";

const ClarkVsDaniel = ({
  label,
  heading,
  tableHeading1,
  whatCrmShows,
  tablesubheading1,
  tableHeading2,
  lumopathReveals,
  tablesubheading2,
  conclusion,
  conclusionIcon,
  ctaLabel,
}) => {
  return (
    <section className={clsx("container", s.clarkVsDaniel)}>
      <Heading
        badge={label}
        title={heading}
        badgeColor="green"
        className={s.clarkVsDaniel_heading}
        markdownComponents={{ em: ({ children }) => <span>{children}</span> }}
      />

      <div className={s.clarkVsDaniel_tables}>
        <div className={s.clarkVsDaniel_whatShows} data-aos="fade-up">
          <h3
            className={s.clarkVsDaniel_whatShows_heading}
            data-aos="fade-up"
            data-aos-delay={200}
          >
            {tableHeading1}
          </h3>
          {!!whatCrmShows && (
            <table className={s.clarkVsDaniel_whatShows_table}>
              <thead data-aos="fade-up" data-aos-delay={300}>
                <tr>
                  {whatCrmShows.columns?.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {whatCrmShows.data?.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    data-aos="fade-up"
                    data-aos-delay={400 + rowIndex * 100}
                  >
                    {whatCrmShows.columns?.map((column) => (
                      <td key={column}>{row[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div
            className={s.clarkVsDaniel_whatShows_subheading}
            data-aos="fade-up"
            data-aos-delay={400 + whatCrmShows.data?.length * 100 + 100}
          >
            <MarkdownText components={{ p: ({ children }) => <>{children}</> }}>
              {tablesubheading1}
            </MarkdownText>
          </div>
        </div>

        <RevealTable
          tableHeading2={tableHeading2}
          lumopathReveals={lumopathReveals}
          tablesubheading2={tablesubheading2}
        />
      </div>

      <div data-aos="fade-up" className={s.clarkVsDaniel_conclusion}>
        <div className={s.clarkVsDaniel_conclusionContent}>
          {conclusionIcon && (
            <Image
              src={conclusionIcon.url}
              alt={conclusionIcon.alt || conclusionIcon.basename}
              width={56}
              height={56}
              className={s.clarkVsDaniel_conclusionIcon}
            />
          )}
          <MarkdownText
            components={{ em: ({ children }) => <span>{children}</span> }}
          >
            {conclusion}
          </MarkdownText>
        </div>
        <CtaButton>{ctaLabel}</CtaButton>
      </div>
    </section>
  );
};

export default ClarkVsDaniel;
