import React from 'react';
import clsx from 'clsx';
import MarkdownText from '../MarkdownText';
import s from './HeroInner.module.scss';

const HeroInner = ({
  heading,
  description,
  searchLabel,
  inputValue,
  setInputValue,
  children,
}) => {
  return (
    <section className={clsx('container', s.hero)}>
      <div className={s.hero_content}>
        <h1 data-aos='fade-down' className={s.hero_title}>
          <MarkdownText
            components={{
              p: ({ children }) => <>{children}</>,
            }}
          >
            {heading}
          </MarkdownText>
        </h1>

        {description && (
          <div
            data-aos='fade-down'
            data-aos-delay='100'
            className={s.hero_descr}
          >
            <MarkdownText>{description}</MarkdownText>
          </div>
        )}

        {searchLabel && (
          <div data-aos='fade-down' data-aos-delay='200' className={s.search}>
            <input
              type='search'
              placeholder={searchLabel}
              className={s.search_input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        )}
      </div>

      {children}
    </section>
  );
};

export default HeroInner;
