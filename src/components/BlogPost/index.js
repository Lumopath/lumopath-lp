import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/utils/dateFormatting';
import clsx from 'clsx';
import s from './BlogPost.module.scss';

const BlogPost = ({ item, isMain = false, className, ...rest }) => (
  <Link
    href={`/blog/${item.slug}`}
    className={clsx(s.preview, { [s.main]: isMain }, className)}
    {...rest}
  >
    {item.image?.url && (
      <Image
        src={item.image.url}
        alt={item.image.alt || item.title}
        width={isMain ? 696 : 376}
        height={isMain ? 391 : 212}
        className={clsx(s.preview_pic, { [s.main]: isMain })}
        priority={isMain}
      />
    )}
    <span className={clsx(s.preview_content, { [s.main]: isMain })}>
      <span className={clsx(s.preview_title, { [s.main]: isMain })}>
        {item.title}
      </span>
      {item.excerpt && (
        <span className={clsx(s.preview_excerpt, { [s.main]: isMain })}>
          {item.excerpt}
        </span>
      )}
      <span className={clsx(s.preview_date, { [s.main]: isMain })}>
        {formatDate(item._createdAt)}
      </span>
    </span>
  </Link>
);

export default BlogPost;
