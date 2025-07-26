'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// import logo from '@/assets/img/logo.svg?url';
// import logoWhite from '@/assets/img/logo-white.svg?url';

const Logo = ({ isFooter, pic, className }) => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const linkProps = !isHomepage && { href: '/', className: className };

  return React.createElement(
    !isHomepage ? Link : React.Fragment,
    {
      ...linkProps,
    },
    <Image
      src={pic.url}
      width={pic.width}
      height={pic.height}
      alt={pic.alt || pic.basename}
      className={!isHomepage ? null : className}
      priority={!isFooter ? true : null}
    />
  );
};

export default Logo;
