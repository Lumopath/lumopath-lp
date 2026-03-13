import React from "react";
import s from "./TheMath.module.scss";
import Heading from "../Heading";
import Image from "next/image";
import clsx from "clsx";

const TheMath = ({ label, heading, drivers }) => {
  return (
    <section className={clsx("container", s.math)}>
      <Heading badge={label} title={heading} badgeColor="blue" />

      {!!drivers?.length && (
        <div className={s.math_drivers}>
          {drivers.map((driver, index) => (
            <div
              key={index}
              className={s.math_driver}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {!!driver.icon && (
                <Image
                  src={driver.icon.url}
                  alt={driver.icon.alt || driver.icon.basename}
                  width={56}
                  height={56}
                  className={s.math_driver_icon}
                />
              )}

              <h3 className={clsx("h6", s.math_driver_title)}>
                {driver.headline}
              </h3>
              <p className={s.math_driver_theMath}>{driver.theMath}</p>
              <p className={s.math_driver_proofPoint}>{driver.proofPoint}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TheMath;
