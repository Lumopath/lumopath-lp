import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import s from './SecurityList.module.scss';

const SecurityList = ({ data }) => {
  if (!data || !data.length) {
    return null;
  }
  return (
    <section className={clsx('container', s.list)}>
      {data.map(({ icon, title, description }, i) => (
        <div
          key={title + i}
          data-aos='fade-up'
          data-aos-delay={i * 100}
          className={s.list_item}
        >
          {icon?.url && (
            <Image
              src={icon.url}
              alt={icon.alt || icon.basename}
              width={56}
              height={56}
              className={s.list_icon}
            />
          )}

          <div className='h6'>{title}</div>

          {description && <div className={s.list_descr}>{description}</div>}
        </div>
      ))}
    </section>
  );
};

export default SecurityList;
