import Link from "next/link";

export default function Page(){
  return(
    <section className="container my-5">
      <div className="row">
        <div className="col-10 offset-1">
          <div className="row">
            <div className="col-md-6 col-12 ">
              <img  src="/banner2.jpeg"  className="img-fluid"/>
            </div>
            
          <div className="col-md-6 col-12 ">
            <h3 className="mb-3">Forget Password</h3>
            <div className="row">
              <div className="col-md-6 col-12 mb-3">
                <label type="inputEmail4" className="form-label">Email</label>
                <input type="email"  className="form-control" placeholder="Email" />
              </div>

              <div className="col-12 mb-3">
                <button className="btn  hms-color-dark m-2">Submit</button>

              </div>
  
              <p>
                if you are not registered user, <Link href="/user/signup">SignUp here</Link>
              </p>

            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}