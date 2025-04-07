import Link from "next/link";

export default function RoomType(){
  return(
    <div className="col-4 mb-4">
      <Link href='/room-types/single-bedroom'>
      <img src="/banner1.jpeg" className="card-img-top" alt="Room Types" />
      </Link>
      <div className="card-body hms-color-dark text-white">
        <h5>

          <Link href='/room-types/single-bedroom' className="text-white">Single Bedroom</Link>
        </h5>

      </div>

    </div>
  )
}