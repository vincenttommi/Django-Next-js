import Link from "next/link";
export default function HomeReviews() {
    return (
        <section className="container my-5">
            <h2 className="my-5 text-center" style={{ color: '#68004c' }}>Reviews <Link href="#" className="float-end  fs-4  btn btn-primary text-white" style={{'backgroundColor': '#68004c' }}>View All</Link></h2>
            <div className="row mb-5">
                <div className="col-5 border p-2">
                    <h5 className="" style={{ color: '#68004c' }}>John Kirubi</h5>
                    <p>This is a great Project</p>
                    <span className="text-warning">
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                    </span>
                </div>

                <div className="col-5 offset-1 ms-auto border p-2">
                    <h5 className="" style={{ color: '#68004c' }}>Author Name</h5>
                    <p>Amazing Experience</p>
                    <span className="text-warning">
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                    </span>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-5 border p-2">
                    <h5 className="" style={{ color: '#68004c' }}>Vincent Tommi</h5>
                    <p>This is a great Project</p>
                    <span className="text-warning">
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                    </span>
                </div>

                <div className="col-5 offset-1 ms-auto border p-2">
                    <h5 className="" style={{ color: '#68004c' }}>Simon Mwangi</h5>
                    <p>Amazing Experience</p>
                    <span className="text-warning">
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                        <i className="fa fa-star fa-2x"></i>
                    </span>
                </div>
            </div>
        </section>
    );
}
