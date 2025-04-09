import Link from "next/link";

export default function RoomType({ item }) {
  console.log("Room Type images:", item.room_type_images);

  // Default fallback image
  let imageUrl = "/banner1.jpeg";

  // Extract the first image URL from room_type_images
  if (item.room_type_images && item.room_type_images.length > 0) {
    const firstImage = item.room_type_images[0];

    if (typeof firstImage === "object" && firstImage !== null) {
      imageUrl = firstImage.image || "/banner1.jpeg"; // Fallback if image property is missing
    } else if (typeof firstImage === "string") {
      imageUrl = firstImage;
    }
  }

  return (
    <div className="col-4 mb-4">
      <div className="card h-100 hms-color-dark"> {/* Ensure card takes full height */}
        <Link href={`/room-types/${item.id}`}>
          <img
            src={imageUrl}
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