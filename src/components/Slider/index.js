"use client";
import React, { useEffect, useState } from "react";
import * as SliderRadix from "@radix-ui/react-slider";
import clsx from "clsx";

import s from "./Slider.module.scss";

const Slider = ({
  max = 100,
  step = 1,
  min = 0,
  maxLabel = "",
  minLabel = "",
  onChange,
  showInput = false,
  value = 5,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [onDemandUpdate, setOnDemandUpdate] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleOnChange = (value) => {
    onChange(value);
    setOnDemandUpdate((prev) => !prev);
  };

  return (
    <div
      className={clsx(s.slider, { [s.hasInput]: showInput })}
      key={onDemandUpdate ? "1" : "0"}
    >
      <SliderRadix.Root
        className={s.slider_root}
        defaultValue={[value]}
        max={max}
        step={step}
        min={min}
        onValueChange={onChange}
        onPointerDown={(e) => {
          if (e.target.tagName === "INPUT") {
            e.preventDefault();
            e.stopPropagation();
            e.target.focus();
            e.target.select();
          }
        }}
      >
        <SliderRadix.Track className={s.slider_track}>
          <SliderRadix.Range className={s.slider_range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.slider_thumb} aria-label="Volume">
          {showInput && (
            <input
              className={s.slider_input}
              inputMode="numeric"
              type="number"
              value={localValue}
              onBlur={() => {
                handleOnChange(localValue);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleOnChange(localValue);
                }
              }}
              onChange={(e) => {
                setLocalValue(Number(e.target.value));
              }}
            />
          )}
        </SliderRadix.Thumb>
      </SliderRadix.Root>

      {(maxLabel || minLabel) && (
        <div className={s.slider_labels}>
          <span className={s.slider_valueLabel}>{minLabel}</span>
          <span className={s.slider_valueLabel}>{maxLabel}</span>
        </div>
      )}
    </div>
  );
};

export default Slider;
