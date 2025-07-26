'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import BtnPopup from '../BtnPopup';
import s from './Button.module.scss';

gsap.registerPlugin(ScrollToPlugin);

const Button = ({
  variant,
  size,
  href,
  isExternal,
  children,
  className,
  ...rest
}) => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const shouldApplyStyles = Boolean(variant);
  const btnProps = {
    className: clsx(
      className,
      shouldApplyStyles && s.btn,
      shouldApplyStyles && s[variant],
      shouldApplyStyles && size && s[size]
    ),
    ...(isExternal && { target: '_blank', rel: 'noopener noreferrer' }),
    ...rest,
  };

  if (href === '#popup') {
    return <BtnPopup label={children} {...btnProps} />;
  }

  const isAnchor = href?.startsWith('#');

  if (isAnchor && isHomepage) {
    const handleScroll = (e) => {
      e.preventDefault();
      gsap.to(window, { scrollTo: href, ease: 'power2' });
    };

    return (
      <a href={href} onClick={handleScroll} {...btnProps}>
        {children}
      </a>
    );
  }

  if (isAnchor && !isHomepage) {
    return (
      <Link href={`/${href}`} {...btnProps}>
        {children}
      </Link>
    );
  }

  if (href) {
    return isExternal ? (
      <a href={href} {...btnProps}>
        {children}
      </a>
    ) : (
      <Link href={href} {...btnProps}>
        {children}
      </Link>
    );
  }

  return <button {...btnProps}>{children}</button>;
};

export default Button;
