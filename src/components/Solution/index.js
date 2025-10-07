import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import MarkdownText from '../MarkdownText';
import Badge from '../Badge';
import s from './Solution.module.scss';

const Solution = ({ title, descr, list }) => {
  if (!title) {
    return null;
  }
  return (
    <section className={clsx('container', s.solution)}>
      <h2 data-aos='fade-up'>{title}</h2>

      {descr && (
        <div
          data-aos='fade-up'
          data-aos-delay={100}
          className={s.solution_descr}
        >
          <MarkdownText>{descr}</MarkdownText>
        </div>
      )}

      {list?.length > 0 && (
        <div className={s.solution_list}>
          {list.map(({ label, description, image }, index) => (
            <div key={index} className={s.solution_item}>
              {image?.url && (
                <div data-aos='zoom-in' className={s.solution_item_media}>
                  <Image
                    src={image.url}
                    width={image.width}
                    height={image.height}
                    alt={image.alt || image.basename}
                    className={s.solution_item_pic}
                  />
                </div>
              )}
              <div data-aos='fade-up' className={s.solution_item_content}>
                {label && <Badge variant='blue'>{label}</Badge>}
                <div className={s.solution_item_descr}>
                  <MarkdownText>{description}</MarkdownText>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Solution;
