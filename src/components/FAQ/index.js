import React from 'react';
import Heading from '../Heading';
import AccordionList from '../Accordion';
import s from './FAQ.module.scss';

const FAQ = ({ label, heading, description, list }) => {
  return (
    <section id='faq' className='container'>
      <div className={s.faq}>
        <Heading
          badge={label}
          badgeColor='blue'
          title={heading}
          descr={description}
        />

        <AccordionList data={list} className={s.faq_list} />
      </div>
    </section>
  );
};

export default FAQ;
