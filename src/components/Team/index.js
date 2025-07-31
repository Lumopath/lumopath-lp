import React from 'react';
import s from './Team.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

const Team = ({ heading, description, list }) => {
  return (
    <section className='container'>
      <div className={s.team}>
        <h2>{heading}</h2>

        {description && <div className={s.team_descr}>{description}</div>}

        {!!list.length && (
          <div className={s.team_list}>
            {list.map(({ name, label, color, photo }, i) => (
              <div key={name + i} className={s.team_item}>
                {photo?.url && (
                  <Image
                    src={photo.url}
                    alt={photo.alt || name}
                    width={240}
                    height={240}
                    className={s.team_pic}
                  />
                )}

                <div className={clsx(s.team_info, { [s[color]]: color })}>
                  <span className={s.team_name}>{name}</span>
                  {label && <span className={s.team_position}>{label}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
