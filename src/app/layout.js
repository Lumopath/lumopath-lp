import { Instrument_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { performRequest } from '@/lib/datocms';
import './globals.scss';

const instrumentSans = Instrument_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Lumopath | Stop Guessing, Start Growing',
  description:
    "Lumopath is the AI-driven analytics and coaching platform for GTM teams. We turn hidden effort into predictable revenue and unlock your team's true potential.",
};

const CONTENT_QUERY = `
  query Global {
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
      <body className={`${instrumentSans.className}`} suppressHydrationWarning>
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
