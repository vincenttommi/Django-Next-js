import BarChart from "@/app/components/user/BarChart";
import Link from "next/link";
export default function Page(){
    return(
      <section  className="container m-5 ">
        <div className="row">
            <div className="col-md-4 col-12">
                  <div className="list-group">
                    <Link className="list-group-item hms-bg-normal" href="#">Dashboard</Link>
                    <Link className="list-group-item" href="#">Booking history</Link>
                    <Link className="list-group-item" href="#">Payment logs</Link>
                    <Link className="list-group-item" href="#">Update Profile</Link>
                    <Link className="list-group-item text-danger" href="#">Logout</Link>
                  </div>
            </div>
            <div className="col-md-8 col-12">
                    <div className="row">
                     <div className="col-6 text-center p-3 ">
                       <div className="card">
                        <h3 className="card-header">Total Bookings</h3>
                        <div className="card-body">
                        <h4><Link href="#">200</Link></h4>
                        </div>
                        </div>
                    </div>

                    <div className="col-6 text-center p-3">
                        <div className="card">
                            <h3 className="card-header">Total Payments</h3>
                            <div className="card-body">
                                <h4><Link href="#">50000</Link></h4>
                            </div>
                        </div>
                        
                    </div>                  

                </div>

                {/* chart start */}
                <div className="row  my-4">
                    <div className="col-12"  id="paymentChart">
                        <BarChart/>
                    </div>

                </div>
            </div>
        </div>
      </section>
    );
}