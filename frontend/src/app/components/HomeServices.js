
import Link from "next/link";

export default function HomeServices() {
    return (
        <section className="container my-5" >
            <h3 className="my-5 text-center " style={{color:'#68004c'}}  >Services</h3>
            <div className="row text-center">  
                <div className="col-4">
                    <div className="card">
                        <Link href='/room-types'>
                        <img src="1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-bg-normal  text-white">
                            <h5 className="card-title" ><Link href='/room-types' className="text-white">Room Types</Link></h5>
                        </div>
                    </div>    
                </div>
                <div className="col-4">
                    <div className="card">
                        <Link href='/room-types'>
                        <img src="1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-bg-normal text-white">
                            <h5 className="card-title">Room Types</h5>
                        </div>
                    </div>    
                </div>
                <div className="col-4">
                    <div className="card">
                        <Link href='/room-types'>
                        <img src="1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-bg-normal text-white ">
                            <h5 className="card-title">Room Types</h5>
                        </div>
                    </div>    
                </div>
            </div>
        </section>
    );
}
