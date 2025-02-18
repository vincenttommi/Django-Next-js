"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

export default function HomeBanners() {
  return (
    <Carousel  showThumbs={false}>
      <div>
        <Image src="/banner2.jpeg" alt="Banner 2" width={800} height={400} />
      </div>
      <div>
        <Image src="/banner2.jpeg" alt="Banner 2" width={800} height={400} />
      </div>
      <div>
        <Image src="/banner3.jpeg" alt="Banner 3" width={800} height={400} />
      </div>
    </Carousel>
  );
}
