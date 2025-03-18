"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomeBanners() {

            
    const [BannerList, setBannerList] = useState([]);
  
    async function fetchData() {
      try {

        const response = await fetch("http://localhost:8000/website/banners/", { mode: "cors" });
      
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const res = await response.json();
        setBannerList(res); // Moved inside try block
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  
    useEffect(() => {
      fetchData();
    }, []);
  




  return (
      <Carousel showThumbs={false}>
    {BannerList.map((item, index) => (
      <div key={index}>
        <Image   src={item.image}  alt={item.title} width={1000} height={400} style={{ boxShadow:"none"}}
        objectFit="contain"
        />
      </div>
    ))}
  </Carousel>
  );
}
