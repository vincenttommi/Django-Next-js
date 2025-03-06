import DashboardSidebar from "@/app/components/user/DashboardSidebar";
import Link from "next/link";

export default function Page() {
  return (
    <section className="container m-5">
      <div className="row">
        <div className="col-md-4 col-12">
          <DashboardSidebar />
        </div>
        <div className="col-md-8 col-12">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Detail</th>
                  <th>Invoice</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>03/05/2025</td>
                  <td>
                    <p className="m-0 fw-bold hms-color">Birthday Party</p>
                    <p className="m-0 fw-bold hms-color">100 Guests</p>
                  </td>
                  <td>
                    <p className="m-0 fw-bold">
                      <Link href="#">100,000</Link>
                    </p>
                    <p className="m-0 fw-bold">
                      <Link href="#">50,000</Link>
                    </p>
                    <p className="m-0 fw-bold">
                      <Link href="#">Bello-EVT-123</Link>
                    </p>
                    <p className="m-0 fw-bold text-danger">Due</p>
                  </td>
                  <td>
                    <Link href="#" className="btn btn-sm btn-outline-danger ms-1">
                      Cancel
                    </Link>
                    <Link href="#" className="btn btn-sm hms-color-dark ms-1">
                      Pay Now
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>03/05/2025</td>
                  <td>
                    <p className="m-0 fw-bold hms-color">Birthday Party</p>
                    <p className="m-0 fw-bold hms-color">100 Guests</p>
                  </td>
                  <td>
                    <p className="m-0 fw-bold">
                      <Link href="#">100,000</Link>
                    </p>
                    <p className="m-0 fw-bold">
                      <Link href="#">50,000</Link>
                    </p>
                    <p className="m-0 fw-bold">
                      <Link href="#">Bello-EVT-123</Link>
                    </p>
                    <p className="m-0 fw-bold text-success">Paid</p>
                  </td>
                  <td>
                    <Link href="#" className="btn btn-sm btn-success ms-1">
                      Support
                    </Link>
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
 