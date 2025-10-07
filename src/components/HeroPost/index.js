import React from 'react';
import Image from 'next/image';
import s from './HeroPost.module.scss';

const HeroPost = ({ date, title, pic }) => {
  return (
    <section className={s.hero}>
      <span data-aos='fade-down' data-aos-delay='100' className={s.hero_date}>
        {date}
      </span>

      <h1 data-aos='fade-down' className='h2'>
        {title}
      </h1>

      {pic?.url && (
        <Image
          src={pic.url}
          alt={pic.alt || title}
          width={1200}
          height={675}
          priority
          data-aos='fade-down'
          className={s.hero_pic}
        />
      )}
    </section>
  );
};

export default HeroPost;
