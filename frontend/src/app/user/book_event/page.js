
import  Link from  "next/link";
import RoomTypeImages from "@/app/components/RoomTypeImages";


export default function Page(){
  return(
    <section className="container my-5">
      <h3 className="my-4">Book Event</h3>
      <div className="row">
        <div className="col-7">
            <RoomTypeImages />
            
        </div>
        <div className="col-5 ">
          <div className="card">
            <h5 className="card-header hms-color-dark">Booking Event</h5>
            <div className="card-body">
            <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label"><b>Event Type</b></label>
           <select className="form-control">
            <option>Birthday Party</option>
            <option>Seminar</option>
            <option>Kitty Party</option>

           </select>
         </div>
         <div className="mb-3">

         <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label"><b>Event Detail</b></label>
            <textarea className="form-control"></textarea>
         </div>
          <label htmlFor="exampleFormControlInput1" className="form-label"><b>Total Guests</b></label>
            <input type="number" className="form-control" />
         </div>
        <div className="mb-3">

          
          <label htmlFor="exampleFormControlInput1" className="form-label"><b>Event Date</b></label>
           <input type="date" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label"><b>Total Cost</b></label>
           <h4 className="hms-color">Ksh.100,000</h4>
        </div>
         <Link  href="/checkout" className="btn hms-color-dark mt-3">Confirm Booking</Link>
            </div> 
          </div>
        </div>
      </div>
    </section>
  )
}