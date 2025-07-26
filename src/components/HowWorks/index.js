import React from 'react';
import Image from 'next/image';
import Heading from '../Heading';
import Button from '../Button';
import Eye from '@/assets/icons/eye.svg';
import Dataflow from '@/assets/icons/dataflow.svg';
import Lightbulb from '@/assets/icons/lightbulb.svg';
import s from './HowWorks.module.scss';

const renderIcon = (icon) => {
  switch (icon) {
    case 'eye':
      return <Eye />;
    case 'dataflow':
      return <Dataflow />;
    case 'lightbulb':
      return <Lightbulb />;
    default:
      return null;
  }
};

const HowWorks = ({
  label,
  heading,
  description,
  list,
  headingSecondary,
  descriptionSecondary,
  button,
  badge,
}) => {
  return (
    <section id='howworks' className='container'>
      <div className={s.how}>
        <Heading
          badge={label}
          badgeColor='blue'
          title={heading}
          descr={description}
        />

        <div className={s.how_list}>
          {list.map(({ icon, title, description }, i) => (
            <div key={title + i} className={s.how_item}>
              {icon && <div className={s.how_icon}>{renderIcon(icon)}</div>}
              <h3 className='h6'>{title}</h3>
              {description && <p className={s.how_descr}>{description}</p>}
            </div>
          ))}
        </div>

        <div className={s.how_info}>
          <div className={s.how_info_content}>
            <h3>{headingSecondary}</h3>
            {descriptionSecondary && (
              <p className={s.how_info_descr}>{descriptionSecondary}</p>
            )}

            {button && (
              <Button
                variant='primary'
                href='/integrations'
                className={s.how_info_btn}
              >
                {button}
              </Button>
            )}
          </div>

          <div className={s.how_info_list}>
            {/* show first 20 items */}
            {/* if length less than 20, do not show the label */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={'i' + i} className={s.how_info_item}>
                <Image
                  src={`https://picsum.photos/32?${i}`}
                  alt={`Integration ${i + 1}`}
                  width={32}
                  height={32}
                  className={s.how_info_icon}
                />
              </div>
            ))}

            <div className={s.how_info_label}>{badge}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
