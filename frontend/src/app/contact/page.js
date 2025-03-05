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
              <h3 className="mb-3">Contact Us</h3>
              <div className="row">
                <div className="col-12 mb-4">
                  <label htmlFor="inputEmail4" className="form-lable">Your Name</label>
                  <input type="text" className="form-control" placeholder="FullName" />
                </div>
                <div className="col-md-6 col-12 mb-4">
                  <label htmlFor="inputEmail4" className="form-label">Your Email</label>
                  <input type="text" className="form-control" placeholder="Mobile"/>

                </div>
                <div className="col-md-6 col-12 mb-4">
                  <label  htmlFor="inputEmail4" className="form-label">Your Mobile </label>
                  <input type="number" className="form-control" placeholder="Username" />
                </div>
                <div className=" col-12 mb-4">
                  <label  htmlFor="inputEmail4" className="form-label">Captcha Code _254</label>
                  <input type="text" className="form-control"  />
                </div>
              <div className=" col-12 mb-3">
                 <label htmlFor='inputEmail4' className="form-label">Your Message</label>
                  <textarea  className="form-control" />
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