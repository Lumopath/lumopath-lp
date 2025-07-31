import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Heading from '../Heading';
import Button from '../Button';
import s from './HowWorks.module.scss';

const HowWorks = ({
  label,
  heading,
  description,
  list,
  headingSecondary,
  descriptionSecondary,
  button,
  badge,
  integrations,
}) => {
  const iconedIntegrations = integrations.filter(
    (integration) => integration?.icon?.url
  );
  const integrationsPreview = iconedIntegrations.slice(0, 20);
  return (
    <section id='howworks' className={clsx('container', s.how)}>
      <Heading
        badge={label}
        badgeColor='blue'
        title={heading}
        descr={description}
      />

      <div className={s.how_list}>
        {list.map(({ icon, title, description }, i) => (
          <div
            key={title + i}
            data-aos='fade-up'
            data-aos-delay={i * 100}
            className={s.how_item}
          >
            {icon?.url && (
              <Image
                src={icon.url}
                alt={icon.alt || icon.basename}
                width={56}
                height={56}
                className={s.how_icon}
              />
            )}
            <h3 className='h6'>{title}</h3>
            {description && <p className={s.how_descr}>{description}</p>}
          </div>
        ))}
      </div>

      <div data-aos='fade-up' className={s.how_info}>
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

        <div
          className={clsx(s.how_info_list, {
            [s.full]: integrationsPreview.length === 20,
          })}
        >
          {integrationsPreview.map(({ name, icon }, i) => (
            <div key={name + i} className={s.how_info_item}>
              <Image
                src={icon.url}
                alt={icon.alt || name}
                width={32}
                height={32}
                className={s.how_info_icon}
              />
            </div>
          ))}

          {integrationsPreview.length === 20 && (
            <div className={s.how_info_label}>{badge}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
