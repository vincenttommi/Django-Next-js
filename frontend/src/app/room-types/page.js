import Link from "next/link";

export default function Page() {
    return (
        <section className="container my-5">
            <h3 className="my-4">Room Types (6)</h3>
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <Link href="/room-types">
                            <img src="room1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-bg-normal text-center text-white">
                            <h5 className="card-title">
                                <Link href='/room-types' className="text-white">Room Type 1</Link>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <Link href="/room-types">
                            <img src="room1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-bg-normal text-center text-white">
                            <h5 className="card-title">
                                <Link href='/room-types' className="text-white">Room Type 2</Link>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-4 mb-4">
                    <div className="card">
                        <Link href="/room-types">
                            <img src="room1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-bg-normal text-white text-center">
                            <h5 className="card-title">
                                <Link href='/room-types' className="text-white">Room Type 3</Link>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-4 mb-4">
                    <div className="card">
                        <Link href="/room-types">
                            <img src="room1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-bg-normal text-white text-center">
                            <h5 className="card-title">
                                <Link href='/room-types' className="text-white">Room Type 4</Link>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-4 mb-4">
                    <div className="card">
                        <Link href="/room-types">
                            <img src="room1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-bg-normal text-white text-center">
                            <h5 className="card-title">
                                <Link href='/room-types' className="text-white">Room Type 5</Link>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-4 mb-4">
                    <div className="card">
                        <Link href="/room-types">
                            <img src="room1.jpg" className="card-img-top" alt="Room Types" />
                        </Link>
                        <div className="card-body hms-bg-normal text-white text-center">
                            <h5 className="card-title">
                                <Link href='/room-types' className="text-white">Room Type 6</Link>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
