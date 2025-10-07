import React from 'react';
import clsx from 'clsx';
import MarkdownText from '../MarkdownText';
import Badge from '../Badge';
import s from './PriorProcess.module.scss';

const PriorProcess = ({ title, label, description }) => {
  if (!title) {
    return null;
  }
  return (
    <section data-aos='fade' className={s.prior}>
      <div className={clsx('container', s.prior_inner)}>
        <h2 data-aos='fade-down'>{title}</h2>

        {description && (
          <div data-aos='fade-up' className={s.prior_content}>
            {label && <Badge variant='pink'>{label}</Badge>}

            <div className={s.prior_description}>
              <MarkdownText>{description}</MarkdownText>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PriorProcess;
