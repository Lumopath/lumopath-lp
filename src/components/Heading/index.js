import React from 'react';
import clsx from 'clsx';
import MarkdownText from '../MarkdownText';
import Badge from '../Badge';
import s from './Heading.module.scss';

const Heading = ({ badge, badgeColor, title, descr, className }) => {
  return (
    <div className={clsx(s.heading, className)}>
      {badge && (
        <Badge data-aos='fade-up' className={s.badge} variant={badgeColor}>
          {badge}
        </Badge>
      )}
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
        <p data-aos='fade-up' data-aos-delay={200} className='lead'>
          {descr}
        </p>
      )}
    </div>
  );
};

export default Heading;
