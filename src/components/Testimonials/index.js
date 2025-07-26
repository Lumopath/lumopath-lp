import React from 'react';
import Image from 'next/image';
import Heading from '../Heading';
import s from './Testimonials.module.scss';

const Testimonials = ({ label, heading, description, list }) => {
  return (
    <section id='testimonials' className={s.testimonials}>
      <div className='container'>
        <Heading
          badge={label}
          badgeColor='blue'
          title={heading}
          descr={description}
        />

        <div className={s.testimonials_list}>
          {list.map(({ author, text, logo }, i) => (
            <div key={'t' + i} className={s.testimonials_item}>
              <div className={s.testimonials_text}>{text}</div>

              <div className={s.testimonials_bottom}>
                {logo?.url && (
                  <Image
                    src={logo.url}
                    alt={logo.alt || logo.basename}
                    width={32}
                    height={32}
                    className={s.testimonials_pic}
                  />
                )}

                {author && <span>{author}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
