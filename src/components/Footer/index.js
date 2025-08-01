import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Logo from '../Logo';
import Menu from '../Menu';
import s from './Footer.module.scss';

const Footer = ({ logo, description, menu, socials, copyright }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-aos='fade' className={s.footer}>
      <div className={clsx('container', s.footer_inner)}>
        <div className={s.footer_top}>
          <div className={s.footer_info}>
            <Logo pic={logo} isFooter />

            {description && <p className={s.footer_descr}>{description}</p>}
          </div>

          <div className={s.footer_menu}>
            {menu.map(({ label, list }, i) => (
              <div key={label + i} className={s.footer_menu_section}>
                {label && <span className={s.footer_menu_title}>{label}</span>}
                <Menu variant='footer' data={list} />
              </div>
            ))}
          </div>
        </div>

        <div className={s.footer_bottom}>
          <p className={s.footer_copy}>
            © {currentYear} {copyright}
          </p>

          {socials && socials.length > 0 && (
            <ul className={s.footer_social}>
              {socials.map(({ icon, label, link }, i) => (
                <li key={label + i} className={s.footer_social_item}>
                  <a
                    href={link}
                    aria-label={label}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={s.footer_social_link}
                  >
                    {icon?.url ? (
                      <Image
                        src={icon.url}
                        alt={icon.alt || label}
                        width={24}
                        height={24}
                        className={s.footer_social_link_icon}
                      />
                    ) : (
                      label
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
