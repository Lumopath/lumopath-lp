import { notFound } from 'next/navigation';
import { performRequest } from '@/lib/datocms';
import './../page.scss';

const QUERY = `
  query {
    layout {
      complianceSoc2Attestation {
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
    title:
      data?.layout?.complianceSoc2Attestation?.title ||
      'Сompliance SOC 2 attestation',
  };
}

export default async function complianceSoc2AttestationPage() {
  const { data } = await performRequest({ query: QUERY });
  const fileUrl = data?.layout?.complianceSoc2Attestation?.url;
  const mimeType =
    data?.layout?.complianceSoc2Attestation?.mimeType || 'application/pdf';

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
