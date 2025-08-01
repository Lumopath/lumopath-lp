import { notFound } from 'next/navigation';
import { performRequest } from '@/lib/datocms';
import './page.scss';

const QUERY = `
  query {
    layout {
      legalDpa {
        url
        title
        mimeType
      }
    }
  }
`;

export async function generateMetadata() {
  const { data } = await performRequest({ query: QUERY });

  return {
    title: data?.layout?.legalDpa?.title || 'DPA',
  };
}

export default async function LegalDpaPage() {
  const { data } = await performRequest({ query: QUERY });
  const fileUrl = data?.layout?.legalDpa?.url;
  const mimeType = data?.layout?.legalDpa?.mimeType || 'application/pdf';

  if (!fileUrl) {
    notFound();
  }

  return (
    <embed
      src={fileUrl}
      type={mimeType}
      width='100%'
      style={{ border: 'none', height: '100dvh' }}
    />
  );
}
