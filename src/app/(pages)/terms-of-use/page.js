import Badge from '@/components/Badge';
import HeroInner from '@/components/HeroInner';
import { StructuredText } from 'react-datocms';
import { performRequest } from '@/lib/datocms';
import { hasStructuredTextContent } from '@/utils/structuredText';
import AccordionList from '@/components/Accordion';
import AnimateChildren from '@/components/AnimateChildren';

const PAGE_CONTENT_QUERY = `
  query TermsOfUse {
    termOfUse {
      heading
      description
      content {
        label
        heading
        note
        text {
          value
        }
        accent {
          value
        }
        faq {
          question
          answer {
            value
          }
        }
      }
    }
  }
`;

export async function generateMetadata() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const description = data?.termOfUse?.description;
  return {
    title: 'Terms of Use',
    ...(description && {
      description,
    }),
  };
}

export default async function TermsOfUse() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const content = data?.termOfUse?.content || [];
  return (
    <>
      <HeroInner
        heading={data.termOfUse.heading}
        description={data.termOfUse.description}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='480'
          height='360'
          fill='none'
          data-aos='zoom-out'
        >
          <rect
            width='120'
            height='120'
            x='120'
            y='240'
            fill='#3B82F4'
            rx='60'
          />
          <path fill='#CC3488' d='M120 0c0 66.27-53.73 120-120 120V0h120Z' />
          <path fill='#4352AF' d='M0 240c0 66.27 53.73 120 120 120V240H0Z' />
          <path
            fill='#CC3488'
            d='M360 240c0 66.27 53.73 120 120 120V240H360Z'
          />
          <path
            fill='#4352AF'
            d='M240 120c0 66.27 53.73 120 120 120V120H240Z'
          />
          <path
            fill='#F7D263'
            d='M360 240c0 66.27-53.73 120-120 120V240h120Z'
          />
          <path
            fill='#3B82F4'
            d='M240 0c-66.27 0-120 53.73-120 120 66.27 0 120-53.73 120-120Z'
          />
          <rect width='120' height='120' x='360' fill='#90E3D7' rx='60' />
          <path fill='#F7D263' d='M240 0c66.27 0 120 53.73 120 120H240V0Z' />
          <path
            fill='#3B82F4'
            d='M360 120h120v120c-66.27 0-120-53.73-120-120Z'
          />
          <path
            fill='#F7D263'
            d='M0 120h60a60 60 0 0 1 0 120 60 60 0 0 1-60-60v-60Z'
          />
          <path
            fill='#90E3D7'
            d='M120 240V120h120c0 66.27-53.73 120-120 120Z'
          />
        </svg>
      </HeroInner>
      <div className='container'>
        <div className='page'>
          {content.label && (
            <Badge data-aos='fade-up' variant='blue'>
              {content.label}
            </Badge>
          )}

          {content.heading && (
            <h2 data-aos='fade-up' data-aos-delay='100'>
              {content.heading}
            </h2>
          )}

          {content.note && (
            <p data-aos='fade-up' data-aos-delay='200' className='page_note'>
              {content.note}
            </p>
          )}

          {hasStructuredTextContent(content.text) && (
            <AnimateChildren
              attribute={{ 'data-aos': 'fade-up' }}
              data-aos='fade'
              data-aos-delay='300'
            >
              <StructuredText data={content.text} />
            </AnimateChildren>
          )}

          {hasStructuredTextContent(content.accent) && (
            <div data-aos='fade-up' className='page_accent'>
              <StructuredText data={content.accent} />
            </div>
          )}

          {!!content.faq.length && (
            <AccordionList data={content.faq} className='page_faq' />
          )}
        </div>
      </div>
    </>
  );
}
