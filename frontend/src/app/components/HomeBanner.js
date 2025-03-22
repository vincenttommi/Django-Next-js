"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomeBanners() {
  const [BannerList, setBannerList] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8000/website/banners/", {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      // console.log("API Response:", res);

      setBannerList(Array.isArray(res) ? res : []); // Ensure response is an array
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
          <img src={item.image} alt={item.title} width="1000" height="400"/>
        </div>
      ))}
    </Carousel>
  );
  

}
