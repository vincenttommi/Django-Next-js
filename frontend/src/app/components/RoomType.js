import Link from "next/link";

export default function RoomType({ item }) {
  // Validate item and room_type_images
  const images = Array.isArray(item?.room_type_images) ? item.room_type_images : [];
  const firstImage = images[0]?.image || "/banner.jpg";

  return (
    <div className="col-4 mb-4" key={item.id}>
      <div className="card h-100 hms-color-dark">
        <Link href={`/room-types/${item.id}`}>
          <img
            src={firstImage}
            className="card-img-top object-fit-cover"
            alt={item.title || "Room type image"}
            style={{ width: "100%", height: "250px" }}
          />
        </Link>
        <div className="card-body text-center">
          <h5 className="card-title">
            <Link href={`/room-types/${item.id}`} className="text-white text-decoration-none">
              {item.title || "Untitled Room"}
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}