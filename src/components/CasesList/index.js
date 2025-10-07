'use client';

import clsx from 'clsx';
import Pagination from '../Pagination';
import CasePreview from '../CasePreview';
import s from './CasesList.module.scss';

export default function CasesList({ cases }) {
  return (
    <Pagination
      items={cases}
      perPage={6}
      renderItem={(item) => <CasePreview key={item.id} item={item} />}
      className={clsx('container', s.cases)}
      listClassName={s.cases_list}
    />
  );
}
