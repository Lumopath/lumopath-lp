"use client";

import React, { Fragment, useEffect, useMemo, useState } from "react";

import s from "./ClarkVsDaniel.module.scss";
import clsx from "clsx";
import MarkdownText from "../MarkdownText";

const MOBILE_BREAKPOINT = 740;

const RevealTable = ({ tableHeading2, lumopathReveals, tablesubheading2 }) => {
  const [isMobile, setIsMobile] = useState(null);
  const data = lumopathReveals;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    handleResize();

    let timeoutId;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const REVEALS_INIT_DELAY = isMobile ? 300 : 700;

  const REVEALS_DATA_DELAY = REVEALS_INIT_DELAY + 400;

  const formatedData = useMemo(() => {
    if (!data) return [];

    if (!isMobile) return data;

    const newData = { columns: data.columns.slice(1), data: data.data };

    return newData;
  }, [data, isMobile]);

  return (
    <div
      className={s.clarkVsDaniel_whatReveals}
      data-aos="zoom-in"
      data-aos-delay={REVEALS_INIT_DELAY}
    >
      <div className={s.clarkVsDaniel_whatReveals_inner}>
        <h3 className={s.clarkVsDaniel_whatReveals_heading}>{tableHeading2}</h3>
        {!!formatedData && (
          <div className={s.clarkVsDaniel_whatReveals_tableWrapper}>
            <table className={s.clarkVsDaniel_whatReveals_table}>
              <thead>
                <tr data-aos="fade-up" data-aos-delay={REVEALS_DATA_DELAY}>
                  {formatedData.columns?.map((column, i) => (
                    <th key={i}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formatedData.data?.map((row, i) => (
                  <Fragment key={i}>
                    {isMobile && (
                      <tr
                        data-aos="fade-up"
                        data-aos-delay={REVEALS_DATA_DELAY + i * 100}
                      >
                        <td
                          colSpan={formatedData.columns.length}
                          className={s.clarkVsDaniel_whatReveals_mobileTitle}
                        >
                          {row[data?.columns?.[0]]}
                        </td>
                      </tr>
                    )}
                    <tr
                      data-aos="fade-up"
                      data-aos-delay={REVEALS_DATA_DELAY + i * 100}
                    >
                      {formatedData.columns?.map((column, j) => (
                        <td
                          key={column}
                          className={clsx({
                            [s.orange]:
                              (!isMobile && j === 1) || (isMobile && j === 0),
                            [s.green]:
                              (!isMobile && j === 2) || (isMobile && j === 1),
                          })}
                        >
                          {row[column]}
                        </td>
                      ))}
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div
          className={s.clarkVsDaniel_whatReveals_subheading}
          data-aos="fade-up"
          data-aos-delay={
            REVEALS_DATA_DELAY + formatedData.data?.length * 100 + 100
          }
        >
          <MarkdownText components={{ p: ({ children }) => <>{children}</> }}>
            {tablesubheading2}
          </MarkdownText>
        </div>
      </div>
    </div>
  );
};

export default RevealTable;
