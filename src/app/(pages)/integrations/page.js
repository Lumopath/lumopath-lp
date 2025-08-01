import { performRequest } from '@/lib/datocms';
import IntegrationsPageContent from './IntegrationsPageContent';

const PAGE_CONTENT_QUERY = `
  query Integrations {
    integrationsModel {
      heading
      description
      searchLabel
      list {
        label
        integrations {
          name
          icon {
            alt
            url
          }
          issoon
        }
      }
      cta {
        heading
        description
        buttonText
      }
    }
  }
`;

export async function generateMetadata() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const description = data?.integrationsModel?.description;
  return {
    title: 'Integrations',
    ...(description && {
      description,
    }),
  };
}

export default async function Integrations() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return <IntegrationsPageContent data={data.integrationsModel} />;
}
