import { notFound } from 'next/navigation';
import { performRequest } from '@/lib/datocms';
import CaseHero from '@/components/CaseHero';
import RelatedMore from '@/components/RelatedMore';
import CasePreview from '@/components/CasePreview';
import CTA from '@/components/CTA';
import Challenge from '@/components/Challenge';
import PriorProcess from '@/components/PriorProcess';
import Solution from '@/components/Solution';
import Result from '@/components/Result';

export const SINGLE_CASE_QUERY = `
  query SingleCase($slug: String!) {
    case(filter: {slug: {eq: $slug}}) {
      id
      visible
      title
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
      relatedMore {
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
        _createdAt
      }
      _createdAt

      stats {
        label
        description
      }
      industry
      about
      quote {
        text
        authorName
        authorLabel
        photo {
          alt
          basename
          height
          width
          url
        }
      }
      challengeSection {
        title
        description
        list {
          icon {
            basename
            alt
            height
            width
            url
          }
          description
        }
      }
      priorProcessSection {
        title
        label
        description
      }
      solutionSection {
        title
        description
        list {
          label
          description
          image {
            alt
            basename
            height
            width
            url
          }
        }
      }
      resultSection {
        title
        description
        list {
          label
          description
        }
      }
    }

    caseStudiesModel {
      relatedMoreTitle
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
      _createdAt
    }

    homepage {
      cta {
        heading
        description
        buttonText
        footnote
      }
    }

    _site {
      globalSeo {
        fallbackSeo {
          title
          description
          image {
            url
          }
        }
      }
    }
  }
`;

export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params.slug;

  const { data } = await performRequest({
    query: SINGLE_CASE_QUERY,
    variables: { slug },
  });

  const post = data?.case;
  const fallbackSeo = data?._site?.globalSeo?.fallbackSeo || {};

  if (!post?.visible) return notFound();

  const title =
    post?.title ||
    fallbackSeo.title ||
    'Lumopath - Stop Guessing, Start Growing';
  const description =
    post?.about ||
    fallbackSeo.description ||
    'AI Coaching to Supercharge Your Team';

  const ogImageUrl = post?.image?.url
    ? `${post.image.url}?w=1200&h=630&fit=crop`
    : fallbackSeo.image?.url || '/og-image.png';

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post?.image?.alt || title || 'Lumopath',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function CasePage({ params }) {
  const { slug } = await params;
  const { data } = await performRequest({
    query: SINGLE_CASE_QUERY,
    variables: { slug },
  });
  const caseStudy = data.case;

  if (!caseStudy?.visible) return notFound();

  return (
    <>
      <CaseHero
        date={caseStudy._createdAt}
        title={caseStudy.title}
        image={caseStudy.image}
        stats={caseStudy.stats}
        logo={caseStudy.logo}
        industry={caseStudy.industry}
        about={caseStudy.about}
        quote={caseStudy.quote}
      />

      <Challenge
        title={caseStudy.challengeSection?.title}
        descr={caseStudy.challengeSection?.description}
        list={caseStudy.challengeSection?.list}
      />

      <PriorProcess
        title={caseStudy.priorProcessSection?.title}
        label={caseStudy.priorProcessSection?.label}
        description={caseStudy.priorProcessSection?.description}
      />

      <Solution
        title={caseStudy.solutionSection?.title}
        descr={caseStudy.solutionSection?.description}
        list={caseStudy.solutionSection?.list}
      />

      <Result
        title={caseStudy.resultSection?.title}
        descr={caseStudy.resultSection?.description}
        list={caseStudy.resultSection?.list}
      />

      <div className='container'>
        <CTA
          title={data.homepage.cta.heading}
          descr={data.homepage.cta?.description}
          btn={data.homepage.cta?.buttonText}
          label={data.homepage.cta?.footnote}
          isInner
        />
      </div>

      <RelatedMore
        title={data.caseStudiesModel.relatedMoreTitle}
        currentPost={caseStudy}
        relatedPosts={caseStudy.relatedMore || []}
        allPosts={data.allCases || []}
        CardComponent={CasePreview}
      />
    </>
  );
}
