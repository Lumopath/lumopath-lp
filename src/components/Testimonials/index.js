'use client';

import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Heading from '../Heading';
import 'swiper/scss';
import s from './Testimonials.module.scss';

const Testimonials = ({ label, heading, description, list }) => {
  return (
    <section id='testimonials' data-aos='fade' className={s.testimonials}>
      <div className='container'>
        <Heading
          badge={label}
          badgeColor='blue'
          title={heading}
          descr={description}
        />

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          slidesPerView='auto'
          spaceBetween={16}
          centeredSlides={true}
          rewind
          updateOnWindowResize
          breakpoints={{
            740: {
              spaceBetween: 36,
              centeredSlides: false,
            },
          }}
          data-aos='fade-up'
          data-aos-delay={100}
          className={s.testimonials_list}
        >
          {list.map(({ author, text, logo }, i) => (
            <SwiperSlide key={'t' + i} className={s.testimonials_item}>
              <div className={s.testimonials_text}>{text}</div>

              <div className={s.testimonials_bottom}>
                {logo?.url ? (
                  <Image
                    src={logo.url}
                    alt={logo.alt || logo.basename}
                    width={64}
                    height={64}
                    className={s.testimonials_pic}
                  />
                ) : (
                  <div className={clsx(s.testimonials_pic, s.empty)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='none'
                    >
                      <path
                        stroke='#0252C0'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='1.5'
                        d='M2 13.33a8.23 8.23 0 0 1 6-2.66 8.23 8.23 0 0 1 6 2.66M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                      />
                    </svg>
                  </div>
                )}

                {author && <span>{author}</span>}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div data-aos='zoom-up' className={s.testimonials_nav}>
          <button
            aria-label='Previous'
            className={clsx('swiper-button-prev', s.testimonials_btn, s.prev)}
          ></button>
          <button
            aria-label='Next'
            className={clsx('swiper-button-next', s.testimonials_btn, s.next)}
          ></button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
