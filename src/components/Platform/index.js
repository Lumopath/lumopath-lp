import React from 'react';
import Image from 'next/image';
import Heading from '../Heading';
import s from './Platform.module.scss';

const Platform = ({ label, heading, description, list }) => {
  return (
    <section id='platform' data-aos='fade' className={s.platform}>
      <div className='container'>
        <Heading
          badge={label}
          badgeColor='pink'
          title={heading}
          descr={description}
        />

        <div className={s.platform_list}>
          {list.map(({ title, description, picture }, i) => (
            <div
              key={title + i}
              data-aos='fade-up'
              data-aos-delay={i * 100}
              className={s.platform_item}
            >
              {picture?.url && (
                <Image
                  src={picture.url}
                  alt={picture.alt || picture.basename}
                  width={picture.width || 368}
                  height={picture.height || 276}
                  className={s.platform_pic}
                />
              )}

              <div className={s.platform_content}>
                <h3 className='h6'>{title}</h3>
                {description && (
                  <div className={s.platform_descr}>{description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platform;
