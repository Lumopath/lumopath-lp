import Features from '@/components/Features';
import HeroInner from '@/components/HeroInner';
import Plans from '@/components/Plans';
import { performRequest } from '@/lib/datocms';

const PAGE_CONTENT_QUERY = `
  query Pricing {
    pricing {
      heading
      description
      plans {
        title
        description
        icon {
          url
          alt
        }
        ispopular
        info {
          value
        }
      }
      features {
        label
        heading
        description
        list {
          icon {
            url
            alt
            basename
          }
          title
          description
        }
      }
    }
  }
`;

export async function generateMetadata() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const description = data?.pricing?.description;
  return {
    title: 'Pricing',
    ...(description && {
      description,
    }),
  };
}

export default async function Pricing() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <>
      <HeroInner
        heading={data.pricing.heading}
        description={data.pricing.description}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='480'
          height='360'
          fill='none'
          data-aos='zoom-out'
        >
          <rect width='120' height='120' y='120' fill='#F7D263' rx='60' />
          <path fill='#3B82F4' d='M0 120C0 53.73 53.73 0 120 0v120H0Z' />
          <path fill='#4352AF' d='M120 240C53.73 240 0 293.73 0 360h120V240Z' />
          <path
            fill='#3B82F4'
            d='M240 120c-66.27 0-120 53.73-120 120h120V120Zm0 240c-66.27 0-120-53.73-120-120h120v120Z'
          />
          <path
            fill='#90E3D7'
            d='M120 120c66.27 0 120-53.73 120-120H120v120Z'
          />
          <rect width='120' height='120' x='240' fill='#CC3488' rx='60' />
          <rect
            width='120'
            height='120'
            x='240'
            y='240'
            fill='#90E3D7'
            rx='60'
          />
          <path
            fill='#90E3D7'
            d='M480 120c-66.27 0-120-53.73-120-120h120v120Z'
          />
          <path
            fill='#3B82F4'
            d='M480 120v120H360c0-66.27 53.73-120 120-120Z'
          />
          <path
            fill='#F7D263'
            d='M360 240h60a60 60 0 0 1 0 120 60 60 0 0 1-60-60v-60Z'
          />
          <path
            fill='#4352AF'
            d='M240 120h120v120c-66.27 0-120-53.73-120-120Z'
          />
        </svg>
      </HeroInner>
      <Plans list={data.pricing.plans} />
      <Features
        label={data.pricing.features.label}
        heading={data.pricing.features.heading}
        description={data.pricing.features.description}
        list={data.pricing.features.list}
      />
    </>
  );
}
