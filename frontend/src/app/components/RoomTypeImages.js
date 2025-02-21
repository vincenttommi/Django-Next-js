"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function RoomTypeImages(){
    return(
        <Carousel showThumbs={false}>

      <div>
        <img src="/banner1.jpg"  />
      </div>
      <div>
        <img src="/banner2.jpeg" />
      </div>
      <div>
        <img src="/banner3.jpeg" />
      </div>
      
        </Carousel>
    );
}