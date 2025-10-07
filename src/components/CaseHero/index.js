import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { formatDate } from '@/utils/dateFormatting';
import Stats from '../Stats';
import MarkdownText from '../MarkdownText';
import s from './CaseHero.module.scss';

const CaseHero = ({
  date,
  title,
  image,
  stats,
  logo,
  industry,
  about,
  quote,
}) => {
  return (
    <section className={clsx('container', s.hero)}>
      <div className={s.hero_top}>
        <div className={s.hero_heading}>
          {date && (
            <span
              data-aos='fade-down'
              data-aos-delay='100'
              className={s.hero_date}
            >
              {formatDate(date)}
            </span>
          )}

          <h1 data-aos='fade-down' className={clsx('h2', s.hero_title)}>
            {title}
          </h1>

          <Stats data={stats} className={s.hero_stats} />
        </div>

        {image?.url && (
          <Image
            src={image.url}
            alt={image.alt || image.basename}
            width={image.width}
            height={image.height}
            data-aos='zoom-in'
            priority
            className={s.hero_pic}
          />
        )}
      </div>

      {(about || quote?.text) && (
        <div data-aos='fade-up' className={s.hero_bottom}>
          {about && (
            <div className={s.hero_info}>
              {logo?.url && (
                <Image
                  src={logo.url}
                  alt={logo.alt || logo.basename}
                  width={logo.width}
                  height={logo.height}
                  priority
                  data-aos='fade-up'
                  className={s.hero_logo}
                />
              )}

              {industry && (
                <div
                  className={s.hero_info_item}
                  data-aos='fade-up'
                  data-aos-delay='100'
                >
                  <span className={s.hero_info_label}>Industry</span>
                  <span>{industry}</span>
                </div>
              )}

              {about && (
                <div
                  data-aos='fade-up'
                  data-aos-delay='150'
                  className={s.hero_info_item}
                >
                  <span className={s.hero_info_label}>About</span>
                  <div>
                    <MarkdownText>{about}</MarkdownText>
                  </div>
                </div>
              )}
            </div>
          )}

          {quote?.text && (
            <div data-aos='fade' className={s.hero_quote}>
              <div
                data-aos='fade-up'
                data-aos-delay='50'
                className={s.hero_quote_text}
              >
                <MarkdownText>{quote.text}</MarkdownText>
              </div>
              {(quote.authorName || quote.authorLabel || quote.photo?.url) && (
                <div
                  data-aos='fade-up'
                  data-aos-delay='100'
                  className={s.hero_quote_author}
                >
                  {quote.photo?.url && (
                    <div className={s.hero_quote_media}>
                      <Image
                        src={quote.photo.url}
                        alt={quote.photo.alt || quote.photo.basename}
                        width={48}
                        height={48}
                        priority
                        className={s.hero_quote_photo}
                      />
                    </div>
                  )}
                  {(quote.authorName || quote.authorLabel) && (
                    <div className={s.hero_quote_heading}>
                      {quote.authorName && <span>{quote.authorName}</span>}
                      {quote.authorLabel && (
                        <span className={s.hero_quote_label}>
                          {quote.authorLabel}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CaseHero;
