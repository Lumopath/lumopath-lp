'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import facebook from '@/assets/icons/facebook.svg';
import linkedin from '@/assets/icons/linkedin.svg';
import x from '@/assets/icons/x.svg';
import s from './ShareButtons.module.scss';

const ShareButtons = ({ title }) => {
  const pathname = usePathname();
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.origin + pathname);
  }, [pathname]);

  if (!shareUrl) return null;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: linkedin,
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: facebook,
    },
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: x,
    },
  ];

  return (
    <div data-aos='fade-up' className={s.share}>
      <span className={s.share_label}>Share</span>

      <div className={s.share_list}>
        {platforms.map(({ name, url, Icon }) => (
          <a
            key={name}
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Share on ${name}`}
            className={s.share_button}
          >
            <Icon className={s.share_icon} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;
