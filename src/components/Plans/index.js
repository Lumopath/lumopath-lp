import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { StructuredText } from 'react-datocms';
import { hasStructuredTextContent } from '@/utils/structuredText';
import BtnPopup from '../BtnPopup';
import s from './Plans.module.scss';
import Badge from '../Badge';

const Plans = ({ list }) => {
  if (!list || !list.length) {
    return null;
  }
  return (
    <section className={clsx('container', s.plans)}>
      {list.map(({ icon, title, description, ispopular, info }, i) => (
        <div
          key={title + i}
          data-aos='fade-up'
          data-aos-delay={i * 100}
          className={clsx(s.plans_item, { [s.popular]: ispopular })}
        >
          {(icon?.url || ispopular) && (
            <div className={s.plans_top}>
              {icon?.url && (
                <Image
                  src={icon.url}
                  alt={icon.alt || title}
                  width={40}
                  height={40}
                  className={s.plans_icon}
                />
              )}
              {ispopular && <Badge variant='pink'>Popular</Badge>}
            </div>
          )}

          <div className='h4'>{title}</div>

          {description && <p className={s.plans_descr}>{description}</p>}

          <BtnPopup
            label='Request a Quote'
            href='#popup'
            size='small'
            variant={ispopular ? 'primary' : 'secondary'}
            className={clsx(s.plans_btn, {
              [s.popular]: ispopular,
            })}
          />

          {hasStructuredTextContent(info) && (
            <div className={s.plans_info}>
              <StructuredText data={info} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Plans;
