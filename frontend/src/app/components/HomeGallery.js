"use client"; // Required for Next.js app directory

import { useState } from "react";
import dynamic from "next/dynamic";



export default function HomeGallery() {
    const [toggler, setToggler] = useState(false);

    return (
        <section className="container my-5">
           

            <h3 className="my-5 text-center" onClick={() => setToggler(!toggler)} style={{ color: '#68004c' }}>
                Gallery
            </h3>

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
