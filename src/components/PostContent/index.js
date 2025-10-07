import React from 'react';
import Image from 'next/image';
import { StructuredText } from 'react-datocms';
import { hasStructuredTextContent } from '@/utils/structuredText';
import AnimateChildren from '@/components/AnimateChildren';
import ShareButtons from '@/components/ShareButtons';
import s from './PostContent.module.scss';

const renderBlock = ({ record }) => {
  switch (record._modelApiKey) {
    case 'image':
      return (
        <div className={s.content_media}>
          <Image
            alt={record.view.alt || record.view.basename}
            src={record.view.url}
            width={record.view.width}
            height={record.view.height}
            className={s.content_pic}
          />

          {record.view.title && (
            <span className={s.content_caption}>{record.view.title}</span>
          )}
        </div>
      );
    default:
      return null;
  }
};

const PostContent = ({ intro, title, content }) => {
  return (
    <div className={s.content}>
      {intro && (
        <p data-aos='fade-up' className={s.content_lead}>
          {intro}
        </p>
      )}

      {hasStructuredTextContent(content) && (
        <AnimateChildren
          attribute={{ 'data-aos': 'fade-up' }}
          data-aos='fade'
          data-aos-delay='300'
        >
          <StructuredText data={content} renderBlock={renderBlock} />
        </AnimateChildren>
      )}

      <ShareButtons title={title} />
    </div>
  );
};

export default PostContent;
