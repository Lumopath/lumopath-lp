import React from 'react';
import Heading from '../Heading';
import Image from 'next/image';
import s from './Features.module.scss';

const Features = ({ label, heading, description, list }) => {
  return (
    <section className={s.features}>
      <div className='container'>
        <Heading
          badge={label}
          badgeColor='blue'
          title={heading}
          descr={description}
        />

        {list.length && (
          <div className={s.features_list}>
            {list.map(({ icon, title, description }, i) => (
              <div
                key={'f' + i}
                data-aos='fade-up'
                data-aos-delay={i * 100}
                className={s.features_item}
              >
                {icon?.url && (
                  <Image
                    src={icon.url}
                    alt={icon.alt || icon.basename}
                    width={56}
                    height={56}
                    className={s.features_icon}
                  />
                )}
                <h3 className='h6'>{title}</h3>
                {description && (
                  <p className={s.features_descr}>{description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;
