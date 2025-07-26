import React from 'react';
import clsx from 'clsx';
import MarkdownText from '../MarkdownText';
import Button from '../Button';
import s from './Hero.module.scss';

const Hero = ({ heading, description, buttonPrimary, buttonSecondary }) => {
  const hasButtonData = (btn) => btn?.label && btn?.link;

  return (
    <section className={clsx('container', s.hero)}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='240'
        height='360'
        fill='none'
        className={s.hero_pic}
      >
        <rect width='120' height='120' fill='#CC3488' rx='60' />
        <rect width='120' height='120' x='120' y='240' fill='#F7D263' rx='60' />
        <path fill='#90E3D7' d='M120 0c66.27 0 120 53.73 120 120H120V0Z' />
        <path fill='#4352AF' d='M120 120h120v120c-66.27 0-120-53.73-120-120Z' />
        <path
          fill='#3B82F4'
          d='M0 240c0-66.27 53.73-120 120-120v240C53.73 360 0 306.27 0 240Z'
        />
      </svg>

      <div className={s.hero_content}>
        <h1>
          <MarkdownText
            components={{
              p: ({ children }) => <>{children}</>,
            }}
          >
            {heading}
          </MarkdownText>
        </h1>

        {description && (
          <div className={s.hero_descr}>
            <MarkdownText>{description}</MarkdownText>
          </div>
        )}

        {(hasButtonData(buttonPrimary) || hasButtonData(buttonSecondary)) && (
          <div className={s.hero_cta}>
            {hasButtonData(buttonPrimary) && (
              <Button
                variant='primary'
                href={buttonPrimary.link}
                className={s.hero_btn}
              >
                {buttonPrimary.label}
              </Button>
            )}

            {hasButtonData(buttonSecondary) && (
              <Button
                variant='secondary'
                href={buttonSecondary.link}
                className={s.hero_btn}
              >
                {buttonSecondary.label}
              </Button>
            )}
          </div>
        )}
      </div>

      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='240'
        height='360'
        fill='none'
        className={s.hero_pic}
      >
        <path
          fill='#F7D263'
          d='M0 0h240c0 66.27-53.73 120-120 120C53.73 120 0 66.27 0 0Z'
        />
        <path
          fill='#CC3488'
          d='M120 180a60 60 0 0 1 60-60h60v60a60 60 0 0 1-120 0Z'
        />
        <path fill='#3B82F4' d='M0 240c0-66.27 53.73-120 120-120v120H0Z' />
        <path fill='#4352AF' d='M0 240c0 66.27 53.73 120 120 120V240H0Z' />
        <path fill='#90E3D7' d='M240 360c0-66.27-53.73-120-120-120v120h120Z' />
      </svg>
    </section>
  );
};

export default Hero;
