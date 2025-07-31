'use client';

import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import Button from '../Button';
import Logo from '../Logo';
import Menu from '../Menu';
import s from './Header.module.scss';

const Header = ({ logo, menu, buttonPrimary, buttonSecondary }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
    document.body.style.overflow = isMenuOpen ? '' : 'hidden';
  };

  const handleClose = () => {
    if (window.innerWidth >= 1200) return;
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1200 && isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen, handleResize]);

  const hasButtonData = (btn) => btn?.label && btn?.link;

  return (
    <header data-aos='fade-down' className={s.header}>
      <div className={clsx('container', s.header_inner)}>
        <Logo pic={logo} className={s.header_logo} />

        <nav className={clsx(s.header_nav, { [s.show]: isMenuOpen })}>
          <Menu variant='header' data={menu} handleClose={handleClose} />

          {(hasButtonData(buttonSecondary) || hasButtonData(buttonPrimary)) && (
            <div className={s.header_nav_btns}>
              {hasButtonData(buttonSecondary) && (
                <Button variant='secondary' href={buttonSecondary.link}>
                  {buttonSecondary.label}
                </Button>
              )}

              {hasButtonData(buttonPrimary) && (
                <Button variant='primary' href={buttonPrimary.link}>
                  {buttonPrimary.label}
                </Button>
              )}
            </div>
          )}
        </nav>

        <div className={s.header_end}>
          <div className={s.header_cta}>
            {hasButtonData(buttonSecondary) && (
              <Button
                variant='secondary'
                size='small'
                href={buttonSecondary.link}
              >
                {buttonSecondary.label}
              </Button>
            )}

            {hasButtonData(buttonPrimary) && (
              <Button variant='primary' size='small' href={buttonPrimary.link}>
                {buttonPrimary.label}
              </Button>
            )}
          </div>

          <button
            type='button'
            aria-label='Menu'
            onClick={handleToggle}
            className={clsx(s.header_hamb, { [s.active]: isMenuOpen })}
          >
            <span className={s.header_hamb_icon} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
