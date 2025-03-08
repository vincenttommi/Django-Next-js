import Link from "next/link"
export default function HomeServices(){
    return(
        <section className="container my-5">
            <h2 style={{ color: '#68004c' }} className="my-5 text-center"  >Services</h2>
            <div className="row  text-center">
                <div className="col-4">
                    <div className="card">
                        <Link href="/room-types" >
                        <img  src="room1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-color-dark  text-white">
                            <h5 className="card-title"><Link  className="text-white" href="/room-types">Room Types</Link></h5>

                        </div>
                    </div>   
                                    
                </div>
                <div className="col-4">
                    <div className="card">
                        <Link href="/room-types" >
                        <img  src="room1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-color-dark  text-white">
                            <h5 className="card-title"><Link className="text-white" href="/room-types">Events</Link></h5>

                        </div>
                    </div>   
                                    
                </div>
                <div className="col-4">
                    <div className="card">
                        <Link href="/room-types" >
                        <img  src="room1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-color-dark  text-white">
                            <h5 className="card-title"><Link className="text-white" href="#">Online Booking</Link></h5>

                        </div>
                    </div>   
                                    
                </div>
            </div>
        </section>
    )
}