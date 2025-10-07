import React from 'react';
import clsx from 'clsx';
import MarkdownText from '../MarkdownText';
import Stats from '../Stats';
import s from './Result.module.scss';

const Result = ({ title, descr, list }) => {
  if (!title && !descr && (!list || list.length === 0)) {
    return null;
  }
  return (
    <section data-aos='fade' className={s.result}>
      <div className={clsx('container', s.result_inner)}>
        {title && (
          <h2 data-aos='fade-down' className={s.result_title}>
            {title}
          </h2>
        )}

        {descr && (
          <div
            data-aos='fade-up'
            data-aos-delay={100}
            className={s.result_descr}
          >
            <MarkdownText>{descr}</MarkdownText>
          </div>
        )}

        {list?.length > 0 && <Stats data={list} className={s.result_stats} />}
      </div>
    </section>
  );
};

export default Result;
