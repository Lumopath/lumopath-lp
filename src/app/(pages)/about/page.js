import HeroInner from '@/components/HeroInner';
import Investors from '@/components/Investors';
import Team from '@/components/Team';
import { performRequest } from '@/lib/datocms';

const PAGE_CONTENT_QUERY = `
  query About {
    about {
      heading
      description
      team {
        heading
        description
        list {
          name
          label
          color
          photo {
            width
            url
            alt
            height
          }
        }
      }
      investors {
        heading
        description
        logos {
          width
          alt
          basename
          height
          url
        }
      }
    }
  }
`;

export async function generateMetadata() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const description = data?.about?.description;
  return {
    title: 'About',
    ...(description && {
      description,
    }),
  };
}

export default async function About() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <>
      <HeroInner
        heading={data.about.heading}
        description={data.about.description}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='480'
          height='360'
          fill='none'
          data-aos='zoom-out'
        >
          <path
            fill='#4352AF'
            d='M120 0c66.27 0 120 53.73 120 120H120V0ZM0 240c0 66.27 53.73 120 120 120V240H0Z'
          />
          <path
            fill='#CC3488'
            d='M240 360c0-66.27-53.73-120-120-120v120h120Z'
          />
          <path
            fill='#90E3D7'
            d='M240 0c0 66.27 53.73 120 120 120V0H240Zm120 360c-66.27 0-120-53.73-120-120h120v120Z'
          />
          <path
            fill='#3B82F4'
            d='M360 360c0-66.27 53.73-120 120-120v120H360Z'
          />
          <path fill='#F7D263' d='M120 120C120 53.73 66.27 0 0 0v120h120Z' />
          <path
            fill='#CC3488'
            d='M240 120h60a60 60 0 0 1 0 120 60 60 0 0 1-60-60v-60Z'
          />
          <path fill='#F7D263' d='M360 0c66.27 0 120 53.73 120 120H360V0Z' />
          <path
            fill='#4352AF'
            d='M360 240V120h120c0 66.27-53.73 120-120 120Z'
          />
          <path
            fill='#3B82F4'
            d='M240 120c0 66.27-53.73 120-120 120 0-66.27 53.73-120 120-120Z'
          />
          <path fill='#90E3D7' d='M120 120v120H0c0-66.27 53.73-120 120-120Z' />
        </svg>
      </HeroInner>
      <Team
        heading={data.about.team.heading}
        description={data.about.team.description}
        list={data.about.team.list}
      />
      <Investors
        heading={data.about.investors.heading}
        description={data.about.investors.description}
        list={data.about.investors.logos}
      />
    </>
  );
}
