import React from 'react';
import s from './RelatedMore.module.scss';

const RelatedMore = ({
  title,
  currentPost,
  relatedPosts,
  allPosts,
  CardComponent,
}) => {
  // Remove current post from relatedPosts in case it was added by mistake
  let selected = relatedPosts.filter((p) => p.id !== currentPost.id);

  // If we have less than 3 related posts, add more from allPosts
  if (selected.length < 3) {
    const extra = allPosts.filter(
      (p) => p.id !== currentPost.id && !selected.find((r) => r.id === p.id)
    );
    selected = [...selected, ...extra].slice(0, 3);
  }

  // If no posts available, don't render the section
  if (!selected.length) return null;

  return (
    <section data-aos='fade' className={s.more}>
      <div className='container'>
        {title && (
          <h2 data-aos='fade-up' className={s.more_title}>
            {title}
          </h2>
        )}

        <div data-aos='fade-up' data-aos-delay='100' className={s.more_list}>
          {selected.map((item) => (
            <CardComponent key={item.id} item={item} className={s.more_item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedMore;
