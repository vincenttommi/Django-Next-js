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
                        <h5 className="card-header">Change Password</h5>
                    <div className="card-body">
                        <div className="row">
                    <div className="col-md-2 col-12 mb-3">
                         <img  src="/banner2.jpeg" width={200}  className="img-fluid"/>
                        </div>
                <div className="col-md-5 col-12 mb-3">
                  <label htmlFor="inputEmail4" className="form-lable">First Name</label>
                  <input type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="col-md-5  col-12 mb-3">
                  <label htmlFor="inputEmail4" className="form-label">Last Name</label>
                  <input type="text" className="form-control" placeholder="Last name"/>

                </div>
                <div className="col-md-5 col-12 mb-4">
                  <label  htmlFor="inputEmail4" className="form-label">Username </label>
                  <input type="text" className="form-control" placeholder="Username" />
                </div>
              <div className="col-md-5 mb-3">
                <label htmlFor="inputEmail4" className="form-label">Mobile</label>
                <input type="number" className="form-control" placeholder="Mobile" />
              </div>
              <div className="col-md-5 mb-2">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input  type="email"  className="form-control"  placeholder="Email" />

              </div>
          
              <div  className="col-md-6 col-12 mb-3">
                <button className="btn btn-secondary">Reset</button>
                <button className="btn hms-color-dark m-2">Submit</button>
              </div>
              <p>
                if you want to change your password,<Link href="/user/change_password">Click  here</Link> 
              </p>
              </div>

                        </div>

                    </div>

                </div>
            </div>

        </section>
    )
}