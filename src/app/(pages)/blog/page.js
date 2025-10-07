import BlogList from '@/components/BlogList';
import HeroCategory from '@/components/HeroCategory';
import { performRequest } from '@/lib/datocms';

const PAGE_CONTENT_QUERY = `
  query PageContent {
    blog {
      title
      description
    }
    allPosts(filter: { visible: { eq: true } }, orderBy: _createdAt_DESC) {
      id
      title
      slug
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
      }
      _createdAt
    }
    _site {
      globalSeo {
        fallbackSeo {
          title
          description
        }
      }
    }
  }
`;

export async function generateMetadata() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const title = data?.blog?.title;
  const description = data?.blog?.description;
  const fallbackSeo = data?._site?.globalSeo?.fallbackSeo || {};
  return {
    title:
      title || fallbackSeo.title || 'Lumopath - Stop Guessing, Start Growing',
    description:
      description ||
      fallbackSeo.description ||
      'AI Coaching to Supercharge Your Team',
  };
}

export default async function BlogPage() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const posts = data.allPosts || [];
  return (
    <>
      <HeroCategory title={data.blog.title} descr={data.blog.description} />

      {!!posts.length && <BlogList posts={posts} />}
    </>
  );
}
