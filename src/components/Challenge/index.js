import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import MarkdownText from '../MarkdownText';
import s from './Challenge.module.scss';

const Challenge = ({ title, descr, list }) => {
  if (!title) {
    return null;
  }
  return (
    <section className={clsx('container', s.challenge)}>
      <h2 data-aos='fade-up'>{title}</h2>

      {descr && (
        <div
          data-aos='fade-up'
          data-aos-delay={100}
          className={s.challenge_descr}
        >
          <MarkdownText>{descr}</MarkdownText>
        </div>
      )}

      {list && list.length > 0 && (
        <div
          data-aos='fade-up'
          data-aos-delay={100}
          className={s.challenge_list}
        >
          {list.map(({ icon, description }, i) => (
            <div key={i} className={s.challenge_item}>
              {icon?.url && (
                <Image
                  src={icon.url}
                  width={80}
                  height={80}
                  alt={icon.alt || icon.basename}
                  className={s.challenge_item_icon}
                />
              )}

              <div className={s.challenge_item_descr}>
                <MarkdownText>{description}</MarkdownText>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Challenge;
