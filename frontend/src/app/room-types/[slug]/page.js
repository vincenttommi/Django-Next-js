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
                <p>Security Camera:<i className="fa fa-star fa-check-circle text-success"></i></p>
              </div>
            </div>

            <h4 className="my-3">Location</h4>
            <p>Google Map</p>
        </div>
        <div className="col-5 ">
          <div className="card">
            <h4 className="card-header">
             Booking Form
            </h4>
          </div>

        </div>
      </div>
    </section>
  )
}