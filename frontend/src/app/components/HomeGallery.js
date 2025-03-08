"use client";

import { useState } from "react";
import FsLightbox from "fslightbox-react";

export default function HomeGallery() {
    const [toggler,setToggler] = useState(false);

    return (
        <section className="container my-5">
            <FsLightbox 
                key={toggler}  // Forces re-render
                toggler={toggler}
                sources={[
                    "/hotel.jpeg",
                    "/hotel.jpeg",
                    "/hotel.jpeg",
                ]}  
            />

            <h2 className="my-5 text-center">Gallery<button onClick={() => setToggler(!toggler)} className="float-end fs-5 btn text-white hms-color-dark">View All</button></h2>
            <div className="row text-center">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="col-4">
                        <div className="card">
                            <img src="/hotel.jpeg" className="card-img-top" alt="Room Types" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
