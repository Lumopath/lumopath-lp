import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { StructuredText } from 'react-datocms';
import { hasStructuredTextContent } from '@/utils/structuredText';
import Heading from '../Heading';
import s from './SecurityFeatures.module.scss';
import Button from '../Button';

const SecurityFeatures = ({ label, heading, description, list, cta }) => {
  return (
    <section className={clsx('container', s.features)}>
      <Heading
        badge={label}
        badgeColor='blue'
        title={heading}
        descr={description}
      />

      {!!list.length && (
        <div className={s.features_list}>
          {list.map(({ icon, title, description }, i) => (
            <div
              key={title + i}
              data-aos='fade-up'
              data-aos-delay={i * 100}
              className={s.features_item}
            >
              <div className={s.features_top}>
                <div className={clsx('h6', s.features_title)}>{title}</div>

                {icon?.url && (
                  <Image
                    src={icon.url}
                    alt={icon.alt || icon.basename}
                    width={24}
                    height={24}
                    className={s.features_icon}
                  />
                )}
              </div>

              {hasStructuredTextContent(description) && (
                <div className={s.features_descr}>
                  <StructuredText data={description} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div data-aos='fade-up' className={s.features_cta}>
        <div className={s.features_cta_content}>
          <h3>{cta.heading}</h3>

          {cta.description && (
            <p className={s.features_cta_descr}>{cta.description}</p>
          )}

          <Button variant='primary' href='https://trust.lumopath.ai/'>
            {cta.buttonText}
          </Button>
        </div>

        {cta.picture?.url && (
          <Image
            src={cta.picture.url}
            alt={cta.picture.alt || cta.picture.basename}
            width={cta.picture.width}
            height={cta.picture.height}
            className={s.features_cta_pic}
          />
        )}
      </div>
    </section>
  );
};

export default SecurityFeatures;
