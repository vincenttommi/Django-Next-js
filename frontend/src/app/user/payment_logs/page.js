
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
                    <th>Payment Date</th>
                    <th>Detail</th>
                    <th>Invoice</th>
                  </tr>
                  </thead>
                  <tbody> 
                    <tr>
                      <td>
                        <p className="m-0 fw-bold hms-color">2 rooms</p>
                        <p className="m-0 fw-bold hms-color">03/03/2025 - 10/03/2025</p>
                        <p className="m-0 fw-bold hms-color">    4 Guests</p>
                      </td>
                      <td>
                        <p className="m-0 fw-bold  "><Link className="hms-color" href="#">Bellissimo 123</Link></p>
                        <p className="m-0 fw-bold "><Link  className="hms-color" href="#">50,000</Link></p>
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