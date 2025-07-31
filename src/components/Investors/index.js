import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import s from './Investors.module.scss';

const Investors = ({ heading, description, list }) => {
  return (
    <section className={s.investors}>
      <div className={clsx('container', s.investors_inner)}>
        <h2>{heading}</h2>

        {description && <div className={s.investors_descr}>{description}</div>}

        {!!list.length && (
          <div className={s.investors_list}>
            {list.map((item, i) => (
              <div key={'i' + i} className={s.investors_item}>
                <Image
                  src={item.url}
                  alt={item.alt || item.basename}
                  width={item.width}
                  height={item.height}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Investors;
