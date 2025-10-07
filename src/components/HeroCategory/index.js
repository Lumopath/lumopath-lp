import React from 'react';
import clsx from 'clsx';
import MarkdownText from '../MarkdownText';
import s from './HeroCategory.module.scss';

const HeroCategory = ({ title, descr, isCase }) => {
  return (
    <section className={s.hero}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='281'
        fill='none'
        data-aos='zoom-out'
        className={s.hero_ill}
      >
        {isCase ? (
          <>
            <rect width='48' height='48' y='20.5' fill='#3B82F4' rx='24' />
            <path fill='#90E3D7' d='M48 116.5a48 48 0 0 1-48-48h48v48Z' />
            <path fill='#CC3488' d='M48 164.5H0a48 48 0 0 1 48-48v48Z' />
            <path fill='#4352AF' d='M48 164.5a48 48 0 0 1-48 48v-48h48Z' />
            <rect width='48' height='48' y='212.5' fill='#F7D263' rx='24' />
          </>
        ) : (
          <>
            <path fill='#90E3D7' d='M0 20.5a48 48 0 0 1 48 48H0v-48Z' />
            <path fill='#CC3488' d='M48 116.5v-48a48 48 0 0 0-48 48h48Z' />
            <rect width='48' height='48' y='116.5' fill='#F7D263' rx='24' />
            <path fill='#4352AF' d='M48 164.5a48 48 0 0 1-48 48v-48h48Z' />
            <path fill='#3B82F4' d='M0 260.5v-48a48 48 0 0 1 48 48H0Z' />
          </>
        )}
      </svg>

      <div className={clsx('container', s.hero_container)}>
        <h1 data-aos='fade-down' className={s.hero_title}>
          {title}
        </h1>

        {descr && (
          <div
            data-aos='fade-down'
            data-aos-delay='100'
            className={s.hero_descr}
          >
            <MarkdownText>{descr}</MarkdownText>
          </div>
        )}
      </div>

      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='281'
        fill='none'
        data-aos='zoom-out'
        className={s.hero_ill}
      >
        {isCase ? (
          <>
            <path fill='#90E3D7' d='M0 20.5a48 48 0 0 1 48 48H0v-48Z' />
            <path fill='#CC3488' d='M48 116.5v-48a48 48 0 0 0-48 48h48Z' />
            <rect width='48' height='48' y='116.5' fill='#F7D263' rx='24' />
            <path fill='#4352AF' d='M48 164.5a48 48 0 0 1-48 48v-48h48Z' />
            <path fill='#3B82F4' d='M0 260.5v-48a48 48 0 0 1 48 48H0Z' />
          </>
        ) : (
          <>
            <rect width='48' height='48' y='20.5' fill='#3B82F4' rx='24' />
            <path fill='#90E3D7' d='M48 116.5a48 48 0 0 1-48-48h48v48Z' />
            <path fill='#CC3488' d='M48 164.5H0a48 48 0 0 1 48-48v48Z' />
            <path fill='#4352AF' d='M48 164.5a48 48 0 0 1-48 48v-48h48Z' />
            <rect width='48' height='48' y='212.5' fill='#F7D263' rx='24' />
          </>
        )}
      </svg>
    </section>
  );
};

export default HeroCategory;
