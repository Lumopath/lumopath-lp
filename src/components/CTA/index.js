import React from 'react';
import clsx from 'clsx';
import Button from '../Button';
import MarkdownText from '../MarkdownText';
import s from './CTA.module.scss';

const CTA = ({ title, descr, btn, label }) => {
  if (!title) {
    return null;
  }
  return (
    <section data-aos='fade' id='cta' className={s.cta}>
      <div className={clsx('container', s.cta_inner)}>
        <h2 data-aos='fade-up' data-aos-delay={100}>
          <MarkdownText
            components={{
              p: ({ children }) => <>{children}</>,
            }}
          >
            {title}
          </MarkdownText>
        </h2>

        {descr && (
          <div data-aos='fade-up' data-aos-delay={200} className={s.cta_descr}>
            {descr}
          </div>
        )}

        {(btn || label) && (
          <div data-aos='fade-up' data-aos-delay={250} className={s.cta_bottom}>
            {btn && (
              <Button variant='primary' href='#popup'>
                {btn}
              </Button>
            )}
            {label && <p className={s.cta_label}>{label}</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default CTA;
