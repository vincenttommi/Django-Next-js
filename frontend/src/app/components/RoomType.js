import Link from "next/link";

export default function RoomType({ item }){


    let images = item.room_type_images;
    let  first_image = '/banner1.jpg';


    if(images.length > 0 && images[0].image){
        first_image = images[0].image;  //override if an image exists
    }


 
    return(
        <div className="col-4 mb-4">
            <div className="card">
                <Link href={`/room-types/${item.title}`}>
                <img src={first_image}  className="card-img-top" alt="Room Types" style={{ height:"200px",objectFit:"cover"}} />
                </Link>
                <div className="card-body hms-color-dark text-white">
                    <h5 className="card-title">

                        <Link  href={`/room-types/${item.title}`}  className="text-white">{item.title}</Link>

                    </h5>
                </div>
            </div>
        </div>
    )
}