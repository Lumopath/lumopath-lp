import React from 'react';
import Button from '../Button';
import MarkdownText from '../MarkdownText';
import s from './CTA.module.scss';

const CTA = ({ title, descr, btn, label }) => {
  if (!title) {
    return null;
  }
  return (
    <section id='cta' className='container'>
      <div className={s.cta}>
        <h2>
          <MarkdownText
            components={{
              p: ({ children }) => <>{children}</>,
            }}
          >
            {title}
          </MarkdownText>
        </h2>

        {descr && <div className={s.cta_descr}>{descr}</div>}

        {btn && label && (
          <div className={s.cta_bottom}>
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
