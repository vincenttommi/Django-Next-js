import  Link from  "next/link";
import RoomTypeImages from "@/app/components/RoomTypeImages";


export default function Page(){
  return(
    <section className="container my-5">
      <div className="row">
        <div className="col-7">
            <RoomTypeImages />
            <h4 className="my-5">Amenties</h4>
            <div className="row">
              <div className="col-3">
                <p>Wifi:<i className="fa fa-star fa-check-circle text-success"></i></p>
                <p>SwimmingPool:<i className="fa fa-star fa-check-circle text-success"></i></p>
                <p>Camera:<i className="fa fa-times-circle text-danger"></i></p>
              </div>
            </div>

            <h4 className="my-3">Location</h4>
            <p>Google Map</p>
        </div>
        <div className="col-5 ">
          <div className="card">
            <h5 className="card-header">Booking Form</h5>
             
            <div className="card-body">
            <div className="mb-3">
         <label for="exampleFormControlInput1" className="form-label"><b>Room Type:</b>Double Bedroom</label>
        </div>
        <div className="mb-3">
          
        <label for="exampleFormControlInput1" className="form-label"><b>Charges:</b>1500/Night</label>
        </div>

        <hr/>

         <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label"><b>Total Guests</b></label>
            <input type="number" className="form-control" />
         </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label"><b>Check-In</b></label>
           <input type="date" className="form-control" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label"><b>Check-Out</b></label>
           <input    type="date" className="form-control"/>
        </div>
        <button className="btn hms-color-dark mt-3">Confirm Booking</button>
            </div> 
          </div>
        </div>
      </div>
    </section>
  )
}