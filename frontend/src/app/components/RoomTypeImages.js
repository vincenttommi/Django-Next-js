"use client";

import dynamic from "next/dynamic";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Carousel = dynamic(() => import("react-responsive-carousel").then((mod) => mod.Carousel), {
  ssr: false,
});

export default function RoomTypeImages({ images = [] }) {
  console.log("RoomTypeImages received:", images); // Debug prop

  if (!Array.isArray(images) || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <Carousel showThumbs={false}>
      {images.map((img, index) => (
        <img
          key={index}
          src={img.image}
          alt={`Room image ${index + 1}`}
          onError={(e) => {
            console.error(`Failed to load image: ${img.image}`);
            e.target.src = "https://via.placeholder.com/150"; // External fallback
          }}
        />
      ))}
    </Carousel>
  );
}