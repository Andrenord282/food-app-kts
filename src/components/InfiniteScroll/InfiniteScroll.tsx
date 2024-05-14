import { FC, memo, useEffect, useRef } from 'react';

const InfiniteScroll: FC<{ isActive: boolean; onVisible: () => void }> = ({ isActive, onVisible }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const scrollElement = scrollRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onVisible();
      }
    }, options);

    if (scrollElement) {
      observer.observe(scrollElement);
    }

    return () => {
      if (scrollElement) {
        observer.unobserve(scrollElement);
      }
    };
  }, [isActive, onVisible]);

  if (!isActive) {
    return;
  }

  return <div ref={scrollRef}>InfiniteScroll</div>;
};

export default memo(InfiniteScroll);
