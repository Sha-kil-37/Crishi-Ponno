"use client";
import { RefObject } from "react";
import SearchBox from "./SearchBox";

interface BannerProps {
  bannerRef: RefObject<HTMLDivElement | null>;
  showNavboxSearch: boolean;
}
//
export default function Banner({ bannerRef, showNavboxSearch }: BannerProps) {
  //
  return (
    <section className="xl:w-7xl mx-auto py-10">
      <div ref={bannerRef}>{!showNavboxSearch && <SearchBox />}</div>
    </section>
  );
}
