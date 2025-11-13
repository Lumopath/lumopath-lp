import { notFound } from 'next/navigation';
import { performRequest } from '@/lib/datocms';
import { formatDate } from '@/utils/dateFormatting';
import HeroPost from '@/components/HeroPost';
import PostContent from '@/components/PostContent';
import RelatedMore from '@/components/RelatedMore';
import BlogPost from '@/components/BlogPost';

export const dynamicParams = false;
export const revalidate = false;

export async function generateStaticParams() {
  const { data } = await performRequest({
    query: `
      query AllSlugs {
        allPosts(filter: { visible: { eq: true } }) {
          slug
        }
      }
    `,
  });

  return data.allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export const SINGLE_POST_QUERY = `
  query SinglePost($slug: String!) {
    post(filter: {slug: {eq: $slug}}) {
      id
      visible
      title
      excerpt
      image {
        url
        alt
        basename
        width
        height
      }
      content {
        value
        blocks {
          id
          _modelApiKey
          view {
            title
            alt
            basename
            width
            height
            url
          }
        }
      }
      relatedMore {
        id
        title
        slug
        excerpt
        image {
          url
          alt
          width
          height
        }
        _createdAt
      }
      _createdAt
    }

    blog {
      relatedMoreTitle
    }

    allPosts(filter: { visible: { eq: true } }, orderBy: _createdAt_DESC) {
      id
      title
      slug
      excerpt
      image {
        url
        alt
        width
        height
      }
      _createdAt
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
    query: SINGLE_POST_QUERY,
    variables: { slug },
  });

  const post = data?.post;
  const fallbackSeo = data?._site?.globalSeo?.fallbackSeo || {};

  if (!post?.visible) return notFound();

  const title =
    post?.title ||
    fallbackSeo.title ||
    'Lumopath - Stop Guessing, Start Growing';
  const description =
    post?.excerpt ||
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

export default async function PostPage({ params }) {
  const { slug } = await params;
  const { data } = await performRequest({
    query: SINGLE_POST_QUERY,
    variables: { slug },
  });
  const post = data.post;

  if (!post?.visible) return notFound();

  return (
    <>
      <div className='container'>
        <HeroPost
          date={formatDate(post._createdAt)}
          title={post.title}
          pic={post.image}
        />

        <PostContent
          intro={post.excerpt}
          title={post.title}
          content={post.content}
        />
      </div>

      <RelatedMore
        title={data.blog.relatedMoreTitle}
        currentPost={post}
        relatedPosts={(post.relatedMore || []).filter((post) => post.visible)}
        allPosts={data.allPosts || []}
        CardComponent={BlogPost}
      />
    </>
  );
}
