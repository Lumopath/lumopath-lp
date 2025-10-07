'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

import Pagination from '../Pagination';
import clsx from 'clsx';
import BlogPost from '../BlogPost';
import s from './BlogList.module.scss';

const BREAKPOINTS = {
  LARGE: 1200,
  MEDIUM: 740,
};

const PER_PAGE_CONFIG = {
  LARGE: 9,
  MEDIUM: 6,
  SMALL: 4,
};

const useResponsivePerPage = () => {
  const [perPage, setPerPage] = useState(PER_PAGE_CONFIG.LARGE);

  const getPerPageValue = useCallback((width) => {
    if (width >= BREAKPOINTS.LARGE) return PER_PAGE_CONFIG.LARGE;
    if (width >= BREAKPOINTS.MEDIUM) return PER_PAGE_CONFIG.MEDIUM;
    return PER_PAGE_CONFIG.SMALL;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setPerPage(getPerPageValue(window.innerWidth));
    };

    handleResize();

    let timeoutId;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(timeoutId);
    };
  }, [getPerPageValue]);

  return perPage;
};

export default function BlogList({ posts }) {
  const perPage = useResponsivePerPage();

  const { mainPost, remainingPosts } = useMemo(() => {
    if (!posts?.length) return { mainPost: null, remainingPosts: [] };

    return {
      mainPost: posts[0],
      remainingPosts: posts.slice(1),
    };
  }, [posts]);

  const renderItem = useCallback(
    (post) => <BlogPost key={post.id} item={post} />,
    []
  );

  if (!posts?.length) {
    return null;
  }

  return (
    <div className={clsx('container', s.blog)}>
      {mainPost && <BlogPost item={mainPost} isMain data-aos='fade-down' />}

      {remainingPosts.length > 0 && (
        <Pagination
          items={remainingPosts}
          perPage={perPage}
          renderItem={renderItem}
          listClassName={s.blog_list}
        />
      )}
    </div>
  );
}
