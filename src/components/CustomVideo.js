'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const CustomVideo = ({ src, poster, alt, className, ...rest }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      videoRef.current.play().catch(() => {});
      return () => hls.destroy();
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
      videoRef.current.play().catch(() => {});
    }
  }, [isVisible, src]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <video
        ref={videoRef}
        poster={poster}
        aria-label={alt}
        className={className}
        muted
        playsInline
        loop
        {...rest}
      />
    </div>
  );
};

export default CustomVideo;
