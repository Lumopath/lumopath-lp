import React from 'react';
import clsx from 'clsx';
import * as Accordion from '@radix-ui/react-accordion';
import { StructuredText } from 'react-datocms';
import s from './Accordion.module.scss';

const AccordionList = ({ data, className }) => {
  return (
    <Accordion.Root type='multiple' className={clsx(s.accordion, className)}>
      {data.map(({ question, answer }, i) => (
        <Accordion.Item
          key={'q' + i}
          value={'q' + i}
          className={s.accordion_item}
        >
          <Accordion.Header asChild>
            <Accordion.Trigger className={s.accordion_title}>
              {question}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={s.accordion_content}>
            <div className={s.accordion_text}>
              <StructuredText data={answer} />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default AccordionList;
