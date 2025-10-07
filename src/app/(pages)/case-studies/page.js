import CasesList from '@/components/CasesList';
import HeroCategory from '@/components/HeroCategory';
import { performRequest } from '@/lib/datocms';

const PAGE_CONTENT_QUERY = `
  query PageContent {
    caseStudiesModel {
      title
      description
    }
    allCases(filter: { visible: { eq: true } }, orderBy: _createdAt_DESC) {
      id
      title
      slug
      image {
        url
        alt
        basename
        width
        height
      }
      logo {
        url
        alt
        basename
        width
        height
      }
    }
    _site {
      globalSeo {
        fallbackSeo {
          title
          description
        }
      }
    }
  }
`;

export async function generateMetadata() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const title = data?.caseStudiesModel?.title;
  const description = data?.caseStudiesModel?.description;
  const fallbackSeo = data?._site?.globalSeo?.fallbackSeo || {};
  return {
    title:
      title || fallbackSeo.title || 'Lumopath - Stop Guessing, Start Growing',
    description:
      description ||
      fallbackSeo.description ||
      'AI Coaching to Supercharge Your Team',
  };
}

export default async function CaseStudiesPage() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const cases = data.allCases || [];
  return (
    <>
      <HeroCategory
        title={data.caseStudiesModel.title}
        descr={data.caseStudiesModel.description}
        isCase
      />

      {!!cases.length && <CasesList cases={cases} />}
    </>
  );
}
