import React from 'react';
import { hasContent } from '@/utils/hasContent';
import clsx from 'clsx';
import s from './Stats.module.scss';

const Stats = ({ data, className }) => {
  if (!hasContent(data, ['label', 'description'])) return null;
  return (
    <div className={clsx(s.stats, className)}>
      {data.map(
        (item, i) =>
          hasContent([item], ['label', 'description']) && (
            <div key={i + 'i'} data-aos='fade-up' className={s.stats_item}>
              {item.label && (
                <span className={s.stats_label}>{item.label}</span>
              )}
              {item.description && (
                <div className={s.stats_descr}>{item.description}</div>
              )}
            </div>
          )
      )}
    </div>
  );
};

export default Stats;
