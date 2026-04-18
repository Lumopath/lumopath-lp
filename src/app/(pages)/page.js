import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import HowWorks from "@/components/HowWorks";
import Intro from "@/components/Intro";
import Why from "@/components/Why";
import Solutions from "@/components/Solutions";
import { performRequest } from "@/lib/datocms";
import ClarkVsDaniel from "@/components/ClarkVsDaniel";
import Signal from "@/components/Signal";
import Questions from "@/components/Questions";
import ROI from "@/components/ROI";

const PAGE_CONTENT_QUERY = `
  query Home {
    homepage {
      hero {
        heading
        description
        callout
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
      signal{
        heading
        label
        description
        summary
        ctaLabel
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
      }
      roi{
        label
        ctaLabel
        blocks{
          label
          list{
            ... on RoiSummaryItemRecord{
              key
              initialValue
              label
              __typename
            }
            
             ... on RoiSummaryInputRecord{
              key
              initialValue
              label
              __typename
            }
            
             ... on RoiSummarySliderRecord{
              key
              maximumValue
              maximumValueLabel
              minimumValue
              minimumValueLabel
              initialValue
              label
              __typename
            }
            
             ... on RoiSummaryResultRecord{
              key
              initialValue
              label
              __typename
            }
          }
        }
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
          bottomText
        }
      }
      whyNot{
        label
        heading
        cards{
          name
          body
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
        callout={data.homepage.hero.callout}
      />
      <Intro
        customers={data.homepage.customers}
        problems={data.homepage.problems}
        testimonials={data.homepage.testimonials}
      />
      <Signal {...data.homepage.signal} />
      <ClarkVsDaniel {...data.homepage.clarkVsDaniel} />
      {/* <Platform {...data.homepage.platform} /> */}
      <HowWorks
        {...data.homepage.howworks}
        integrations={data.allIntegrations}
      />
      <ROI {...data.homepage.roi} />
      <Solutions {...data.homepage.solutions} />
      <Questions {...data.homepage.whyNot} />
      <Why {...data.homepage.why} />
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
