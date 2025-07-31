import React from 'react';
import Image from 'next/image';
import Heading from '../Heading';
import s from './SecurityHow.module.scss';

const SecurityHow = ({ label, heading, description, list }) => {
  return (
    <section data-aos='fade' className={s.how}>
      <div className='container'>
        <Heading
          badge={label}
          badgeColor='blue'
          title={heading}
          descr={description}
        />

        {!!list.length && (
          <div className={s.how_list}>
            {list.map(({ icon, title, description }, i) => (
              <div
                key={title + i}
                data-aos='fade-up'
                data-aos-delay={i * 100}
                className={s.how_item}
              >
                {icon?.url && (
                  <Image
                    src={icon.url}
                    alt={icon.alt || icon.basename}
                    width={56}
                    height={56}
                    className={s.how_icon}
                  />
                )}

                <div className='h6'>{title}</div>

                {description && (
                  <div className={s.how_descr}>{description}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SecurityHow;
