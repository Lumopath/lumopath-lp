'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const CustomVideo = ({ src, poster, alt, className }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      playsInline
      autoPlay
      muted
      loop
      aria-label={alt}
      className={className}
    />
  );
};

export default CustomVideo;
