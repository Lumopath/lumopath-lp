'use client';

import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AnimateChildren = ({ children, attribute = {}, ...rest }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      Array.from(container.children).forEach((child) => {
        if (child.nodeType === 1) {
          Object.entries(attribute).forEach(([key, value]) => {
            child.setAttribute(key, value);
          });
        }
      });

      AOS.refreshHard();
    }
  }, [attribute]);

  return (
    <div ref={containerRef} {...rest}>
      {children}
    </div>
  );
};

export default AnimateChildren;
