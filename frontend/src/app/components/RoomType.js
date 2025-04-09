import Link from "next/link";

export default function RoomType({ item }) {

   console.log("Room Type images:", item.room_type_images);
  //Attempting to  extract the image URL from the first element of room_type_images
  let  imageUrl = "/banner2.jpeg"; //Default fallback

  if(item.room_type_images && item.room_type_images.length > 0){
    const firstImage = item.room_type_images[0];
  

  //Checking if firstImage is an object or a string
  if(typeof firstImage === "String"){
    imageUrl = firstImage;   // if it's a direct URL String
  } else if(typeof firstImage === "object" && firstImage !== null){
    //if it's an object,Try common fields like 'url','image', or 'src'
    imageUrl = firstImage.url || firstImage.image || firstImage.src || firstImage;
  }
}
 
  return (
    <div className="col-4 mb-4">
      <Link href={`/room-types/${item.id}`}> {/* Use dynamic ID for routing */}
        <img src={imageUrl} className="card-img-top" alt={item.title}  />
      </Link>
      <div className="card-body hms-color-dark text-white">
        <h5>
          <Link href={`/room-types/${item.id}`} className="text-white">
            {item.title}
          </Link>
        </h5>
      </div>
    </div>
  );
}