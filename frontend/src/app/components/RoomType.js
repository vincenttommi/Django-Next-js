import Link from "next/link";

export default function RoomType({ item }) {
  
  var images = item.room_type_images;
  if(images[0]){
    var first_image=images[0].image;
  }else{
    var first_image = "/banner.jpg"
  }

  return (
    <div className="col-4 mb-4">
      <div className="card h-100 hms-color-dark"> {/* Ensure card takes full height */}
        <Link href={`/room-types/${item.id}`}>
          <img
            src={first_image}
            className="card-img-top object-fit-cover"
            alt={item.title}
            style={{ width: "100%", height: "250px" }} // Fixed height for consistency
          />
        </Link>
        <div className="card-body text-center "> {/* Added card-body for better spacing */}
          <h5 className="card-title">
            <Link href={`/room-types/${item.id}`} className="text-white text-decoration-none">
              {item.title}
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}