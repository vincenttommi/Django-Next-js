import Link from "next/link";
import DashboardSidebar from "@/app/components/user/DashboardSidebar";
export default function Page(){
    return(
        <section className="container my-5">
            <div className="row">
                <div className="col-md-4  col-12">
                    <DashboardSidebar />
                </div>
                <div className="col-md-8 col-12">
                    < div className="card">
                        <h5 className="card-header">Update Profile</h5>
                    <div className="card-body">
                        <div className="row">
                <div className="col-md-5 col-12 mb-3">
                  <label htmlFor="inputEmail4" className="form-lable">New Password</label>
                  <input type="password" className="form-control" placeholder="***" />
                </div>
                <div className="col-md-5 col-12 mb-3">
                  <label htmlFor="inputEmail4" className="form-lable">Confirm Password</label>
                  <input type="password" className="form-control" placeholder="*****" />
                </div>
              <div  className="col-md-6 col-12 mb-3">
                <button className="btn btn-secondary">Reset</button>
                <button className="btn hms-color-dark m-2">Submit</button>
              </div>
              </div>
                </div>    

                </div>


                </div>
            </div>

        </section>
    )
}