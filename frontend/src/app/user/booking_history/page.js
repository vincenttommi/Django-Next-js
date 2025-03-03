
import DashboardSidebar from "@/app/components/user/DashboardSidebar";
import Link from "next/link";
export default function Page(){
  return(
      <section  className="container m-5  ">
        <div className="row">
            <div className="col-md-4 col-12">
                  <DashboardSidebar/>
            </div>
            

            <div className="col-md-8 col-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th>Booking Date</th>
                    <th>Detail</th>
                    <th>Invoice</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody> 
                    <tr>
                      <td>03/03/2025</td>
                      <td>
                        <p className="m-0 fw-bold hms-color">2 rooms</p>
                        <p className="m-0 fw-bold hms-color">03/03/2025 - 10/03/2025</p>
                        <p className="m-0 fw-bold hms-color">    4 Guests</p>
                      </td>
                      <td>
                        <p className="m-0 fw-bold "><Link href="#">Bellissimo 123</Link></p>
                        <p className="m-0 fw-bold "><Link href="#">50,000</Link></p>
                        <p className="m-0 fw-bold text-danger">    Due</p>
                      </td>
                      <td>
                          <Link href="#" className="btn btn-sm btn-outline-success">Approve</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </section>
    );
}