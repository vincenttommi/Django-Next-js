import Link from "next/link";

export default function Page(){
  return(
    <section className="container my-5">
      <div className="row">
        <div className="col-10 offset-1">
          <div className="row">
            <div className="col-md-6 col-12">
              <img  src="/banner2.jpeg"  className="img-fluid"/>
            </div>
            <div className="col-md-6 col-12">
              <h3 className="mb-3">SignUp</h3>
              <div className="row">
                <div className="col-md-6 col-12 mb-4">
                  <label htmlFor="inputEmail4" className="form-lable">First Name</label>
                  <input type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="col-md-6 col-12 mb-4">
                  <label htmlFor="inputEmail4" className="form-label">Last Name</label>
                  <input type="text" className="form-control" placeholder="Last name"/>

                </div>
                <div className="col-md-6 col-12 mb-4">
                  <label  htmlFor="inputEmail4" className="form-label">Username </label>
                  <input type="text" className="form-control" placeholder="Username" />
                </div>

              <div className="col-md-6 col-12 mb-3">
                 <label htmlFor='inputEmail4' className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="****" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="inputEmail4" className="form-label">Mobile</label>
                <input type="number" className="form-control" placeholder="Mobile" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input  type="email"  className="form-control"  placeholder="Email" />

              </div>
          
              <div  className="col-md-6 col-12 mb-3">
                <button className="btn btn-secondary">Reset</button>
                <button className="btn hms-color-dark m-2">Submit</button>
              </div>
              <p>
                if you are already registered user, <Link href="/user/login">Login here</Link> 
              </p>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </section>
  )
}