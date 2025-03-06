import Link from "next/link"
export default function HomeServices(){
    return(
        <section className="container my-5">
            <h2 className="my-5 text-center" style={{ color:"#7f005d"}}  >Services</h2>
            <div className="row  text-center">
                <div className="col-4">
                    <div className="card">
                        <img  src="room1.jpg" className="card-img-top" alt="Room Types" />
                        <div className="card-body bg-dark  text-white">
                            <h5 className="card-title"><Link href="#">Events</Link></h5>

                        </div>
                    </div>   
                                    
                </div>
                <div className="col-4">
                    <div className="card">
                        <img  src="room1.jpg" className="card-img-top" alt="Room Types" />
                        <div className="card-body bg-dark  text-white">
                            <h5 className="card-title"><Link href="#">Room Types</Link></h5>

                        </div>
                    </div>   
                                    
                </div>
                <div className="col-4">
                    <div className="card">
                        <img  src="room1.jpg" className="card-img-top" alt="Room Types" />
                        <div className="card-body bg-dark  text-white">
                            <h5 className="card-title"><Link href="#">Online Booking</Link></h5>

                        </div>
                    </div>   
                                    
                </div>
            </div>
        </section>
    )
}