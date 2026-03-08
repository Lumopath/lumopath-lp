import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import HowWorks from "@/components/HowWorks";
import Intro from "@/components/Intro";
import Platform from "@/components/Platform";
import Testimonials from "@/components/Testimonials";
import Why from "@/components/Why";
import Solutions from "@/components/Solutions";
import { performRequest } from "@/lib/datocms";
import ClarkVsDaniel from "@/components/ClarkVsDaniel";
import ProductDefinition from "@/components/ProductDefinition";

const PAGE_CONTENT_QUERY = `
  query Home {
    homepage {
      hero {
        heading
        description
        buttonPrimary {
          label
          link
        }
        buttonSecondary {
          label
          link
        }
      }
      customers {
        title
        logos {
          width
          url
          alt
          basename
          height
        }
      }
      problems {
        label
        heading
        description
        list {
          title
          icon {
            url
            alt
            basename
          }
          description
        }
      }
      clarkVsDaniel{
        label
        heading
        tableHeading1
        whatCrmShows
        tablesubheading1
        tableHeading2
        lumopathReveals
        tablesubheading2
        conclusion
        conclusionIcon {
          url
          alt
          basename
        }
        ctaLabel
      }
      productDefinition{
        content
      }
      platform {
        label
        heading
        description
        list {
          title
          quote
          description
          picture {
            basename
            height
            alt
            url
            width
          }
        }
      }
      howworks {
        label
        heading
        description
        callout
        calloutIcon {
          url
          alt
          basename
        }
        list {
          icon {
            url
            alt
            basename
          }
          iconActive {
            url
            alt
            basename
          }
          title
          description
          content {
            url
            alt
            basename
            width
            height
          }
        }
        headingSecondary
        descriptionSecondary
        button
        badge
      }
      solutions {
        label
        heading
        description
        list {
          label
          title
          description
          list {
            title
            description
          }
          picture {
            basename
            alt
            height
            url
            width
          }
        }
      }
      why {
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
          link {
            label
            link
          }
        }
      }
      testimonials {
        label
        heading
        description
        list {
          author
          text
          logo {
            width
            url
            height
            alt
            basename
          }
        }
      }
      faq {
        label
        heading
        description
        list {
          question
          answer {
            value
          }
        }
      }
      cta {
        heading
        description
        buttonText
        footnote
      }
    }
    allIntegrations(first: 100) {
      name
      icon {
        url
        alt
      }
    }
  }
`;

export default async function Home() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const cta = data.homepage.cta;
  return (
    <>
      <Hero
        heading={data.homepage.hero.heading}
        description={data.homepage.hero.description}
        buttonPrimary={data.homepage.hero.buttonPrimary}
        buttonSecondary={data.homepage.hero.buttonSecondary}
      />
      <Intro
        customers={data.homepage.customers}
        problems={data.homepage.problems}
      />
      <ClarkVsDaniel {...data.homepage.clarkVsDaniel} />
      <Platform {...data.homepage.platform} />
      <ProductDefinition {...data.homepage.productDefinition} />
      <HowWorks
        {...data.homepage.howworks}
        integrations={data.allIntegrations}
      />
      <Solutions {...data.homepage.solutions} />
      <Why {...data.homepage.why} />
      <Testimonials {...data.homepage.testimonials} />
      <FAQ {...data.homepage.faq} />
      <CTA
        title={cta.heading}
        descr={cta.description}
        btn={cta.buttonText}
        label={cta.footnote}
      />
    </>
  );
}
