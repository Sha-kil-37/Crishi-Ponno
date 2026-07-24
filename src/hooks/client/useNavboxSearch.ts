import { RefObject, useEffect, useState } from "react";

export function useNavboxSearch(
  bannerRef: RefObject<HTMLDivElement | null>
) {
  const [showNavboxSearch, setShowNavboxSearch] = useState(false);

  useEffect(() => {
    if (!bannerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNavboxSearch(!entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(bannerRef.current);

    return () => observer.disconnect();
  }, []);

  return showNavboxSearch;
}