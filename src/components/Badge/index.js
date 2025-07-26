import React from 'react';
import clsx from 'clsx';
import s from './Badge.module.scss';

const Badge = ({ variant, children, className }) => {
  return (
    <div className={clsx(s.badge, { [s[variant]]: variant }, className)}>
      {children}
    </div>
  );
};

export default Badge;
