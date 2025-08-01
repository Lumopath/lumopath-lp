import { Instrument_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AOSInit } from '@/components/AOS';
import { performRequest } from '@/lib/datocms';
import Script from 'next/script';
import './globals.scss';

export const dynamic = 'force-dynamic';

const instrumentSans = Instrument_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

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
    layout {
      header {
        logo {
          height
          width
          url
          alt
          basename
        }
        menu {
          label
          link
        }
        buttonPrimary {
          label
          link
        }
        buttonSecondary {
          label
          link
        }
      }
      footer {
        logo {
          width
          url
          height
          basename
          alt
        }
        description
        copyright
        socials {
          link
          label
          icon {
            url
            alt
          }
        }
        menu {
          label
          list {
            label
            link
          }
        }
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
  const { data } = await performRequest({ query: CONTENT_QUERY });
  const headerLogo = data?.layout?.header?.logo || {};
  const headerMenu = data?.layout?.header?.menu || [];
  const buttonPrimary = data?.layout?.header?.buttonPrimary || {};
  const buttonSecondary = data?.layout?.header?.buttonSecondary || {};
  const footerLogo = data?.layout?.footer?.logo || {};
  const footerMenu = data?.layout?.footer?.menu || [];
  const footerSocials = data?.layout?.footer?.socials || [];
  const copyright = data?.layout?.footer?.copyright || '';
  const description = data?.layout?.footer?.description || '';

  return (
    <html lang='en'>
      <head>
        <Script id='apollo-tracker' strategy='afterInteractive'>
          {`
            (function initApollo(){
              var n=Math.random().toString(36).substring(7);
              var o=document.createElement("script");
              o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
              o.async = true;
              o.defer = true;
              o.onload = function(){
                window.trackingFunctions.onLoad({
                  appId: "660b364a5c16db02e83eb720"
                });
              };
              document.head.appendChild(o);
            })();
          `}
        </Script>
      </head>
      <body className={`${instrumentSans.className}`} suppressHydrationWarning>
        <AOSInit />
        <div className='layout'>
          <Header
            logo={headerLogo}
            menu={headerMenu}
            buttonPrimary={buttonPrimary}
            buttonSecondary={buttonSecondary}
          />
          {children}
          <Footer
            logo={footerLogo}
            menu={footerMenu}
            socials={footerSocials}
            copyright={copyright}
            description={description}
          />
        </div>
      </body>
    </html>
  );
}
