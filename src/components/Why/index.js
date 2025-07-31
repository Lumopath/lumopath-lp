import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Heading from '../Heading';
import s from './Why.module.scss';

const Why = ({ label, heading, description, list }) => {
  return (
    <section id='why' className={clsx('container', s.why)}>
      <Heading
        badge={label}
        badgeColor='blue'
        title={heading}
        descr={description}
      />

      <div className={s.why_list}>
        {list.map(({ icon, title, description, link }, i) => (
          <div
            key={title + i}
            data-aos='fade-up'
            data-aos-delay={i * 100}
            className={s.why_item}
          >
            {icon?.url && (
              <Image
                src={icon.url}
                alt={icon.alt || icon.basename}
                width={56}
                height={56}
                className={s.why_icon}
              />
            )}
            <h3 className='h6'>{title}</h3>
            {description && <div className={s.why_descr}>{description}</div>}
            {link?.link && (
              <Link href={link.link} className={clsx('link', s.why_link)}>
                Learn more
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Why;
