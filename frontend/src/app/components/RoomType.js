import Link from "next/link";

export default function RoomType({ item }){

   
  
    return(
        <div className="col-4 mb-4">
            <div className="card">
                <Link href={`/room-type/${item.title}`}>
                <img src="/banner1.jpg"  className="card-img-top" alt="Room Types" />
                </Link>
                <div className="card-body hms-color-dark text-white">
                    <h5 className="card-title">

                        <Link href={`/room-type/${item.title}`} className="text-white">{item.title}</Link>

                    </h5>
                </div>
            </div>
        </div>
    )
}