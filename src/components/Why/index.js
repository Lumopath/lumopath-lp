import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Heading from '../Heading';
import Stars from '@/assets/icons/stars.svg';
import Package from '@/assets/icons/package.svg';
import PieChart from '@/assets/icons/pie-chart.svg';
import Shield from '@/assets/icons/shield.svg';
import s from './Why.module.scss';

const renderIcon = (icon) => {
  switch (icon) {
    case 'stars':
      return <Stars />;
    case 'package':
      return <Package />;
    case 'pie-chart':
      return <PieChart />;
    case 'shield':
      return <Shield />;
    default:
      return null;
  }
};

const Why = ({ label, heading, description, list }) => {
  return (
    <section id='why' className='container'>
      <div className={s.why}>
        <Heading
          badge={label}
          badgeColor='blue'
          title={heading}
          descr={description}
        />

        <div className={s.why_list}>
          {list.map(({ icon, title, description, link }, i) => (
            <div key={title + i} className={s.why_item}>
              {icon && <div className={s.why_icon}>{renderIcon(icon)}</div>}
              <h3 className='h6'>{title}</h3>
              {description && <div className={s.why_descr}>{description}</div>}
              {link?.link && (
                <Link href={link.link} className={clsx('link', s.why_link)}>
                  Learn more
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;
