import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import Heading from '../Heading';
import clsx from 'clsx';
import CustomVideo from '../CustomVideo';
import s from './Intro.module.scss';

const Intro = ({ preview, previewPoster, customers, problems }) => {
  const previewType = preview?.video?.mp4Url
    ? 'video'
    : preview?.url
    ? 'image'
    : null;

  const isVideo = previewType === 'video';
  const isPicture = previewType === 'image';
  return (
    <>
      {(isVideo || isPicture) && (
        <div data-aos='zoom-out' data-aos-delay={100} className='container'>
          {isVideo && (
            <CustomVideo
              src={preview.video.streamingUrl}
              poster={previewPoster || preview.video.thumbnailUrl}
              alt={preview.alt || preview.basename}
              className={s.intro}
            />
          )}
          {isPicture && (
            <Image
              width={preview.width}
              height={preview.height}
              src={preview.url}
              alt={preview.alt || preview.basename}
              priority
              className={s.intro}
            />
          )}
        </div>
      )}

      {!!customers.logos.length && (
        <div id='customers' className={s.customers}>
          {customers.title && (
            <div data-aos='fade-down' className={s.customers_label}>
              {customers.title}
            </div>
          )}

          <Marquee gradient gradientWidth={112} autoFill>
            {customers.logos.map((pic, i) => (
              <Image
                key={'c' + i}
                src={pic.url}
                alt={pic.alt || pic.basename}
                width={pic.width}
                height={pic.height}
                data-aos='fade-up'
                className={s.customers_logo}
              />
            ))}
          </Marquee>
        </div>
      )}

      <div id='problems' className={clsx('container', s.problems)}>
        <Heading
          badge={problems.label}
          badgeColor='blue'
          title={problems.heading}
          descr={problems.description}
        />

        <div className={s.problems_list}>
          {problems.list.map(({ title, icon, description }, i) => (
            <div
              data-aos='fade-up'
              data-aos-delay={i * 100}
              key={title + i}
              className={s.problems_item}
            >
              <div className={s.problems_heading}>
                <h3 className={clsx('h6', s.problems_title)}>{title}</h3>
                {icon && (
                  <Image
                    src={icon.url}
                    alt={icon.alt || icon.basename}
                    width={24}
                    height={24}
                    className={s.problems_icon}
                  />
                )}
              </div>

              {description && (
                <div className={s.problems_descr}>{description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Intro;
