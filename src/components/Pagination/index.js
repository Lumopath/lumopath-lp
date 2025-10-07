'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import clsx from 'clsx';
import s from './Pagination.module.scss';

const MOBILE_BREAKPOINT = 740;

export default function Pagination({
  className,
  listClassName,
  items,
  perPage = 6,
  renderItem,
}) {
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(null);
  const containerRef = useRef(null);

  const totalPages = useMemo(
    () => Math.ceil(items.length / perPage),
    [items.length, perPage]
  );

  const currentItems = useMemo(
    () => items.slice((page - 1) * perPage, page * perPage),
    [items, page, perPage]
  );

  const scrollToSectionTopIfNeeded = useCallback(() => {
    const section = containerRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;

    if (sectionHeight > windowHeight) {
      const scrollY = window.scrollY + rect.top - 16;

      window.scrollTo({
        top: scrollY,
        behavior: 'smooth',
      });
    }
  }, []);

  const goToPage = useCallback(
    (p) => {
      if (p >= 1 && p <= totalPages && p !== page) {
        setPage(p);
        requestAnimationFrame(scrollToSectionTopIfNeeded);
      }
    },
    [page, totalPages, scrollToSectionTopIfNeeded]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    handleResize();

    let timeoutId;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [items, perPage]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) return [];

    const numbers = [];
    const range = isMobile ? 1 : 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - range && i <= page + range)
      ) {
        numbers.push(i);
      } else if (numbers[numbers.length - 1] !== '...') {
        numbers.push('...');
      }
    }

    return numbers;
  }, [totalPages, page, isMobile]);

  const PaginationButton = useCallback(
    ({ number, index }) => {
      if (number === '...') {
        return (
          <span key={index} className={clsx(s.pagination_item, s.dots)}>
            …
          </span>
        );
      }

      return (
        <button
          key={index}
          onClick={() => goToPage(number)}
          className={clsx(s.pagination_item, s.number, {
            [s.active]: page === number,
          })}
          aria-label={`Go to page ${number}`}
          aria-current={page === number ? 'page' : undefined}
        >
          {number}
        </button>
      );
    },
    [page, goToPage]
  );

  if (isMobile === null) {
    return (
      <div ref={containerRef} className={className}>
        <div
          className={listClassName}
          data-aos='fade-down'
          data-aos-delay={100}
        >
          {currentItems.map(renderItem)}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <div className={listClassName} data-aos='fade-down' data-aos-delay={100}>
        {currentItems.map(renderItem)}
      </div>

      {totalPages > 1 && (
        <nav
          className={s.pagination}
          aria-label='Pagination Navigation'
          data-aos='fade-up'
        >
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            aria-label='Go to previous page'
            className={clsx(s.pagination_item, s.arrow, s.prev)}
          />

          {pageNumbers.map((number, index) => (
            <PaginationButton key={index} number={number} index={index} />
          ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            aria-label='Go to next page'
            className={clsx(s.pagination_item, s.arrow, s.next)}
          />
        </nav>
      )}
    </div>
  );
}
