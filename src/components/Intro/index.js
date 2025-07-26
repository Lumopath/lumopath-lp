import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import Heading from '../Heading';
import LineChartDown from '@/assets/icons/lineChartDown.svg';
import Burn from '@/assets/icons/burn.svg';
import UserProfiles from '@/assets/icons/userProfiles.svg';
import s from './Intro.module.scss';

const renderIcon = (icon) => {
  switch (icon) {
    case 'line-chart-down':
      return <LineChartDown className={s.problems_icon} />;
    case 'burn':
      return <Burn className={s.problems_icon} />;
    case 'user-profiles':
      return <UserProfiles className={s.problems_icon} />;
    default:
      return null;
  }
};

const Intro = ({ pic, customers, problems }) => {
  return (
    <section className='container'>
      <div className={s.intro}>
        {pic.url && (
          <Image
            src={pic.url}
            priority
            width={pic.width}
            height={pic.height}
            alt={pic.alt || pic.basename}
            className={s.intro_pic}
          />
        )}

        {!!customers.logos.length && (
          <div id='customers' className={s.customers}>
            {customers.title && (
              <div className={s.customers_label}>{customers.title}</div>
            )}

            <Marquee
              gradient
              gradientWidth={112}
              autoFill
              className={s.customers_list}
            >
              {customers.logos.map((pic, i) => (
                <Image
                  key={'c' + i}
                  src={pic.url}
                  alt={pic.alt || pic.basename}
                  width={pic.width}
                  height={pic.height}
                  className={s.customers_logo}
                />
              ))}
            </Marquee>
          </div>
        )}

        <div id='problems' className={s.problems}>
          <Heading
            badge={problems.label}
            badgeColor='blue'
            title={problems.heading}
            descr={problems.description}
          />

          <div className={s.problems_list}>
            {problems.list.map(({ title, icon, description }, i) => (
              <div key={title + i} className={s.problems_item}>
                <div className={s.problems_heading}>
                  <h3 className='h6'>{title}</h3>
                  {icon && renderIcon(icon)}
                </div>

                {description && (
                  <div className={s.problems_descr}>{description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
