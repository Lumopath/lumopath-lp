'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import BtnPopup from '../BtnPopup';
import s from './Menu.module.scss';

gsap.registerPlugin(ScrollToPlugin);

const Menu = ({ variant, handleClose, data }) => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  if (!data || !data.length) return null;

  const handleScroll = (e, link) => {
    e.preventDefault();
    gsap.to(window, { scrollTo: link, ease: 'power2' });
    handleClose?.();
  };

  return (
    <ul className={clsx(s.menu, { [s[variant]]: variant })}>
      {data.map(({ label, link }, i) => {
        if (link === '#popup') {
          return (
            <li key={label + i}>
              <BtnPopup label={label} className={s.menu_link} />
            </li>
          );
        }

        if (link === '#resources') {
          const resourcesLinks = [
            { href: '/blog', label: 'Blog' },
            { href: '/case-studies', label: 'Case Studies' },
          ];

          if (variant === 'header') {
            return (
              <li key={label + i} className={s.menu_group}>
                <span className={s.menu_parent}>Resources</span>
                <ul className={s.menu_sublist}>
                  {resourcesLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => handleClose?.()}
                        className={s.menu_link}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          } else {
            return (
              <React.Fragment key={label + i}>
                {resourcesLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => handleClose?.()}
                      className={s.menu_link}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            );
          }
        }

        const isAnchor = link.includes('#');

        if (isAnchor && isHomepage) {
          return (
            <li key={label + i}>
              <a
                href={link}
                onClick={(e) => handleScroll(e, link)}
                className={s.menu_link}
              >
                {label}
              </a>
            </li>
          );
        }

        return (
          <li key={label + i}>
            <Link
              href={isAnchor ? '/' + link : link}
              onClick={() => handleClose?.()}
              className={s.menu_link}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
