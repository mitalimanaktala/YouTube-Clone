import { useEffect, useRef } from "react";

export default function useInfiniteScroll(callback, hasMore, loading) {
  const observerRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: "400px", 
        threshold: 0,
      }
    );

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observerRef.current.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observerRef.current.unobserve(currentLoader);
      }
    };
  }, [callback, hasMore, loading]);

  return loaderRef;
}