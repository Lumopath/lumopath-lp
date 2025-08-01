import HeroInner from '@/components/HeroInner';
import SecurityFeatures from '@/components/SecurityFeatures';
import SecurityHow from '@/components/SecurityHow';
import SecurityList from '@/components/SecurityList';
import { performRequest } from '@/lib/datocms';

const PAGE_CONTENT_QUERY = `
  query Security {
    security {
      heading
      description
      list {
        icon {
          alt
          basename
          url
          width
          height
        }
        title
        description
      }
      how {
        heading
        description
        list {
          icon {
            width
            height
            url
            alt
            basename
          }
          title
          description
        }
      }
      features {
        heading
        description
        list {
          title
          icon {
            alt
            basename
            width
            height
            url
          }
          description {
            value
          }
        }
      }
      cta {
        heading
        description
        buttonText
        picture {
          alt
          basename
          url
          width
          height
        }
      }
    }
  }
`;

export async function generateMetadata() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const description = data?.security?.description;
  return {
    title: 'Security',
    ...(description && {
      description,
    }),
  };
}

export default async function Security() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <>
      <HeroInner
        heading={data.security.heading}
        description={data.security.description}
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
            x='360'
            y='240'
            fill='#3B82F4'
            rx='60'
          />
          <path fill='#3B82F4' d='M120 120C120 53.73 173.73 0 240 0v120H120Z' />
          <path fill='#4352AF' d='M120 240C53.73 240 0 293.73 0 360h120V240Z' />
          <path
            fill='#CC3488'
            d='M120 240c0 66.27 53.73 120 120 120V240H120Zm120-120c0 66.27 53.73 120 120 120 0-66.27-53.73-120-120-120Z'
          />
          <path
            fill='#F7D263'
            d='M360 240c0 66.27-53.73 120-120 120V240h120Z'
          />
          <path
            fill='#4352AF'
            d='M240 120c66.27 0 120-53.73 120-120H240v120Z'
          />
          <rect width='120' height='120' fill='#F7D263' rx='60' />
          <path fill='#90E3D7' d='M360 0c66.27 0 120 53.73 120 120H360V0Z' />
          <path
            fill='#4352AF'
            d='M480 120v120H360c0-66.28 53.73-120 120-120Z'
          />
          <path
            fill='#3B82F4'
            d='M0 120h60a60 60 0 0 1 0 120 60 60 0 0 1-60-60v-60Z'
          />
          <path
            fill='#90E3D7'
            d='M120 240V120h120c0 66.27-53.73 120-120 120Z'
          />
        </svg>
      </HeroInner>
      <SecurityList data={data.security.list} />
      <SecurityHow
        heading={data.security.how.heading}
        description={data.security.how.description}
        list={data.security.how.list}
      />
      <SecurityFeatures
        heading={data.security.features.heading}
        description={data.security.features.description}
        list={data.security.features.list}
        cta={data.security.cta}
      />
    </>
  );
}
