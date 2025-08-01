import { performRequest } from '@/lib/datocms';
import './globals.scss';

export const dynamic = 'force-dynamic';

const CONTENT_QUERY = `
  query Global {
    _site {
      globalSeo {
        siteName
        titleSuffix
        fallbackSeo {
          title
          twitterCard
          description
          image {
            url
          }
        }
      }
      favicon {
        url
      }
    }
  }
`;

export async function generateMetadata() {
  const { data } = await performRequest({ query: CONTENT_QUERY });

  const fallbackSeo = data?._site?.globalSeo?.fallbackSeo || {};
  const siteName = data?._site?.globalSeo?.siteName || 'Lumopath';
  const faviconUrl = data?._site?.favicon?.url || '/favicon.svg';

  const ogImageUrl = fallbackSeo.image?.url || '/og-image.png';

  return {
    title: {
      template: `%s${data?._site?.globalSeo?.titleSuffix || ''}`,
      default: fallbackSeo.title || 'Lumopath - Stop Guessing, Start Growing',
    },
    description: fallbackSeo.description || 'Default description',
    openGraph: {
      images: [
        {
          url: ogImageUrl,
          alt: fallbackSeo.title || 'Open Graph Image',
          width: 1200,
          height: 630,
        },
      ],
      siteName,
    },
    appleWebApp: { title: siteName },
    applicationName: siteName,
    icons: {
      icon: faviconUrl,
      apple: faviconUrl,
      shortcut: faviconUrl,
    },
    twitter: {
      card: fallbackSeo.twitterCard || 'summary_large_image',
      images: [ogImageUrl],
    },
    formatDetection: {
      telephone: false,
      email: false,
      date: false,
      address: false,
      url: false,
    },
  };
}

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
