import Badge from '@/components/Badge';
import HeroInner from '@/components/HeroInner';
import { performRequest } from '@/lib/datocms';
import { StructuredText } from 'react-datocms';
import { hasStructuredTextContent } from '@/utils/structuredText';
import AccordionList from '@/components/Accordion';
import AnimateChildren from '@/components/AnimateChildren';

const PAGE_CONTENT_QUERY = `
  query PrivacyPolicy {
    privacyPolicy {
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
  const description = data?.privacyPolicy?.description;
  return {
    title: 'Privacy Policy',
    ...(description && {
      description,
    }),
  };
}

export default async function PrivacyPolicy() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const content = data?.privacyPolicy?.content || [];
  return (
    <>
      <HeroInner
        heading={data.privacyPolicy.heading}
        description={data.privacyPolicy.description}
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
            fill='#90E3D7'
            rx='60'
            transform='matrix(-1 0 0 1 360 240)'
          />
          <path fill='#3B82F4' d='M360 120C360 53.73 306.28 0 240 0v120h120Z' />
          <path
            fill='#4352AF'
            d='M360 240c66.28 0 120 53.73 120 120H360V240Zm-240 0c0 66.27-53.72 120-120 120V240h120Z'
          />
          <path
            fill='#CC3488'
            d='M240 120c0 66.27-53.72 120-120 120V120h120Z'
          />
          <path
            fill='#F7D263'
            d='M120 240c0 66.27 53.73 120 120 120 0-66.27-53.72-120-120-120Z'
          />
          <path
            fill='#4352AF'
            d='M240 120c-66.27 0-120-53.73-120-120h120v120Z'
          />
          <rect
            width='120'
            height='120'
            fill='#F7D263'
            rx='60'
            transform='matrix(-1 0 0 1 480 0)'
          />
          <path fill='#90E3D7' d='M120 0C53.73 0 0 53.73 0 120h120V0Z' />
          <path
            fill='#4352AF'
            d='M0 120v120h120c0-66.28-53.73-120-120-120Zm360 0h-60a60 60 0 0 0 0 120 60 60 0 0 0 60-60v-60Z'
          />
          <path
            fill='#90E3D7'
            d='M480 240V120H360c0 66.27 53.73 120 120 120Z'
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
