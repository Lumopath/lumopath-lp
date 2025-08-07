'use client';

import { useEffect, useRef } from 'react';
import poster from '@/assets/img/poster.webp';

const CustomVideo = ({ className, ...rest }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    const containerEl = containerRef.current;

    if (!videoEl || !containerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      {
        threshold: 1,
      }
    );

    observer.observe(containerEl);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <video
        ref={videoRef}
        src='/hero.webm'
        poster={poster?.src}
        aria-label='Video'
        muted
        playsInline
        loop
        className={className}
        {...rest}
      />
    </div>
  );
};

export default CustomVideo;
