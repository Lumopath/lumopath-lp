import React, { useMemo } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Badge from '../Badge';
import s from './IntegrationsList.module.scss';

const IntegrationsList = ({ data, query }) => {
  const filteredData = useMemo(() => {
    if (!data || !data.length) return [];

    if (!query.trim()) return data;

    return data
      .map(({ label, integrations }) => {
        const filteredIntegrations = integrations.filter(({ name }) =>
          name.toLowerCase().includes(query)
        );

        return filteredIntegrations.length
          ? { label, integrations: filteredIntegrations }
          : null;
      })
      .filter(Boolean);
  }, [data, query]);

  return (
    <section className={clsx('container', s.categories)}>
      {filteredData.length > 0 ? (
        filteredData.map(({ label, integrations }, i) => (
          <div key={'i' + i} className={s.category}>
            {label && (
              <span data-aos='fade-up' className={s.category_label}>
                {label}
              </span>
            )}

            <div className={s.category_list}>
              {integrations.map(({ name, icon, issoon }, j) => (
                <div
                  key={'int' + j}
                  data-aos='fade-up'
                  data-aos-delay={j * 100}
                  className={clsx(s.category_item, {
                    [s.soon]: issoon,
                  })}
                >
                  {icon?.url && (
                    <Image
                      src={icon.url}
                      alt={icon.alt || name}
                      width={32}
                      height={32}
                      className={s.category_item_icon}
                    />
                  )}

                  <span className={s.category_item_name}>{name}</span>

                  {issoon && (
                    <Badge variant='blue' className={s.category_item_badge}>
                      Soon
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className={s.noResults}>No integrations found for your search.</p>
      )}
    </section>
  );
};

export default IntegrationsList;
