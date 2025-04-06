"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function RoomTypeImages({ images }){
    return(
        <Carousel showThumbs={false}>
           {images.map((img,index)=>(<div>
            <img src={img.images} />
           </div>))}

        </Carousel>
    );
}