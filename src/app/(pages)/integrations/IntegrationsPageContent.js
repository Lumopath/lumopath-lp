'use client';

import { useState, useEffect } from 'react';
import HeroInner from '@/components/HeroInner';
import IntegrationsList from '@/components/IntegrationsList';
import CTA from '@/components/CTA';

const IntegrationsPageContent = ({ data }) => {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(inputValue.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <>
      <HeroInner
        heading={data.heading}
        description={data.description}
        searchLabel={data.searchLabel}
        inputValue={inputValue}
        setInputValue={setInputValue}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='480'
          height='360'
          fill='none'
          data-aos='zoom-out'
        >
          <path fill='#4352AF' d='M120 0c66.27 0 120 53.73 120 120H120V0Z' />
          <path fill='#3B82F4' d='M0 240c0 66.27 53.73 120 120 120V240H0Z' />
          <path
            fill='#F7D263'
            d='M240 360c0-66.27-53.73-120-120-120v120h120Z'
          />
          <path fill='#3B82F4' d='M240 0c0 66.27 53.73 120 120 120V0H240Z' />
          <path
            fill='#4352AF'
            d='M360 360c-66.27 0-120-53.73-120-120h120v120Z'
          />
          <path
            fill='#CC3488'
            d='M480 240c0 66.27-53.73 120-120 120V240h120Z'
          />
          <path fill='#F7D263' d='M120 0C53.73 0 0 53.73 0 120h120V0Z' />
          <path
            fill='#90E3D7'
            d='M360 120h60a60 60 0 0 1 0 120 60 60 0 0 1-60-60v-60Z'
          />
          <path fill='#CC3488' d='M360 0c66.27 0 120 53.73 120 120H360V0Z' />
          <path
            fill='#F7D263'
            d='M360 120c0 66.27-53.73 120-120 120 0-66.27 53.73-120 120-120Z'
          />
          <path
            fill='#CC3488'
            d='M60 120a60 60 0 0 1 0 120H0v-60a60 60 0 0 1 60-60Z'
          />
          <path
            fill='#90E3D7'
            d='M120 120c66.27 0 120 53.73 120 120-66.27 0-120-53.73-120-120Z'
          />
        </svg>
      </HeroInner>

      <IntegrationsList data={data.list} query={query} />

      <CTA
        title={data.cta.heading}
        descr={data.cta.description}
        btn={data.cta.buttonText}
      />
    </>
  );
};

export default IntegrationsPageContent;
