import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import s from './CasePreview.module.scss';

const CasePreview = ({ item, className, ...rest }) => {
  return (
    <Link
      key={item.id}
      href={`/case-studies/${item.slug}`}
      className={clsx(s.case, className)}
      {...rest}
    >
      {item.image?.url && (
        <Image
          src={item.image.url}
          alt={item.image.alt || item.title}
          width={582}
          height={328}
          className={s.case_pic}
        />
      )}
      <span className={s.case_content}>
        {item.logo?.url && (
          <Image
            src={item.logo.url}
            alt={item.logo.alt || item.title}
            width={item.logo.width}
            height={item.logo.height}
            className={s.case_logo}
          />
        )}
        <span className={s.case_title}>{item.title}</span>
      </span>
    </Link>
  );
};

export default CasePreview;
