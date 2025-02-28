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
              <h3 className="mb-3">Login</h3>
              <div className="row">
               
              <div className="col-md-6 mb-3">
                <label htmlFor="inputEmail4" className="form-label">Mobile</label>
                <input type="number" className="form-control" placeholder="Mobile" />
              </div>
              <div className="col-md-6 col-12 mb-3">
                 <label htmlFor='inputEmail4' className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="****" />
              </div>
              
              <div className="col-md-6 col-12 mb-3">
                <button className="btn btn-secondary">Reset</button>
                <button className="btn hms-color-dark ms-2">Submit</button>
              </div>
              <p>
                <Link className="text-danger" href="/user/forgetpassword">Forgetpassword?</Link>
              </p>
                 <p>
                    If you are already registered user,<Link href="/user/signup">SignUp here</Link>
                 </p>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </section>
  )
}