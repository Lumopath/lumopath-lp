"use client";

import React, { useMemo, useState } from "react";
import s from "./ROI.module.scss";
import Heading from "../Heading";
import clsx from "clsx";
import Slider from "../Slider";
import MarkdownText from "../MarkdownText";
import Button from "../Button";
import gsap from "gsap";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const ROI = ({ label, blocks, ctaLabel }) => {
  const calculationBlock = blocks[0];
  const summaryBlock = blocks[1];

  const initialData = calculationBlock.list.reduce((acc, item) => {
    return {
      ...acc,
      [item.key]: item.initialValue,
    };
  }, {});

  const [dataState, setDataState] = useState(initialData);

  const calculatedData = useMemo(() => {
    const capcaity_inefficiency_cost =
      dataState.team_size * dataState.avg_cost * 0.1;
    const revenue_leakage_cost = dataState.arr * 0.02;
    const one_one_prep_time = dataState.team_size * 50 * 60;
    const total_cost =
      capcaity_inefficiency_cost + revenue_leakage_cost + one_one_prep_time;

    return {
      capcaity_inefficiency_cost,
      revenue_leakage_cost,
      one_one_prep_time,
      total_cost,
    };
  }, [dataState]);

  const summaryItems = summaryBlock.list.filter(
    (item) => item.__typename !== "RoiSummaryResultRecord",
  );

  const summaryResults = summaryBlock.list.filter(
    (item) => item.__typename === "RoiSummaryResultRecord",
  );

  return (
    <section className={clsx("container", s.roi)}>
      <Heading badge={label} badgeColor="pink" />

      <div className={s.roi_blocks} data-aos="fade-up">
        <div className={s.calculation}>
          <h2 className={clsx("h3", s.calculation_title)}>
            {calculationBlock?.label}
          </h2>

          <div className={s.calculation_content}>
            {calculationBlock?.list?.map(({ key, ...item }, index) => (
              <RoiBlockItem
                dataAosDelay={index * 100}
                key={key}
                {...item}
                itemKey={key}
                value={dataState[key]}
                onChange={(itemKey, value) => {
                  setDataState((prev) => ({
                    ...prev,
                    [itemKey]: value,
                  }));
                }}
              />
            ))}
          </div>
        </div>

        <div className={s.summary}>
          <h2 className={clsx("h3", s.summary_title)}>{summaryBlock?.label}</h2>
          <div className={s.summary_content}>
            {summaryItems?.map(({ key, ...item }, index) => (
              <RoiBlockItem
                dataAosDelay={index * 100}
                key={key}
                {...item}
                value={calculatedData[key]}
                itemKey={key}
              />
            ))}
          </div>

          <div className={s.summary_result}>
            {summaryResults?.map(({ key, ...item }, index) => (
              <RoiBlockItem
                dataAosDelay={index * 100}
                key={key}
                {...item}
                value={calculatedData[key]}
                itemKey={key}
              />
            ))}
          </div>
        </div>
      </div>

      <CtaButton>{ctaLabel}</CtaButton>
    </section>
  );
};

const CtaButton = ({ children }) => {
  return (
    <Button
      variant="primary"
      href="#popup"
      className={s.roi_ctaButton}
      data-aos="fade-up"
    >
      {children}
    </Button>
  );
};

const typesMap = {
  RoiSummaryItemRecord: "item",
  RoiSummaryInputRecord: "input",
  RoiSummarySliderRecord: "slider",
  RoiSummaryResultRecord: "result",
};

const RoiBlockItem = ({
  label,
  value,
  __typename,
  maximumValue,
  minimumValue,
  maximumValueLabel,
  minimumValueLabel,
  itemKey,
  onChange,
  dataAosDelay,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  if (__typename === "RoiSummarySliderRecord")
    return (
      <div
        data-aos="fade-up"
        data-aos-delay={dataAosDelay}
        className={clsx(s.item, s.item__slider)}
      >
        <h3 className={s.item_label}>
          <MarkdownText components={{ p: ({ children }) => <>{children}</> }}>
            {label}
          </MarkdownText>
        </h3>
        <Slider
          value={value}
          max={maximumValue}
          min={minimumValue}
          maxLabel={maximumValueLabel}
          minLabel={minimumValueLabel}
          showInput
          onChange={(value) => onChange(itemKey, value)}
        />
      </div>
    );
  if (__typename === "RoiSummaryInputRecord") {
    // Blurred: show formatted currency ($1,000). Focused: show raw number (1000).
    const displayValue = isFocused
      ? String(value ?? "")
      : currencyFormatter.format(value || 0);
    return (
      <div
        data-aos="fade-up"
        data-aos-delay={dataAosDelay}
        className={clsx(s.item, s.item__input)}
      >
        <h3 className={s.item_label}>
          <MarkdownText components={{ p: ({ children }) => <>{children}</> }}>
            {label}
          </MarkdownText>
        </h3>

        <input
          type="text"
          inputMode="numeric"
          className={s.item_inputField}
          value={displayValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            const raw = (e.target.value || "").replace(/\D/g, "");
            onChange(itemKey, raw === "" ? 0 : Number(raw));
          }}
        />
      </div>
    );
  }

  const formattedValue = currencyFormatter.format(value || 0);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={dataAosDelay}
      className={clsx(s.item, s[`item__${typesMap[__typename]}`])}
    >
      <h3 className={s.item_label}>{label}</h3>
      <strong className={s.item_value} title={formattedValue}>
        {formattedValue}
      </strong>
    </div>
  );
};

export default ROI;
