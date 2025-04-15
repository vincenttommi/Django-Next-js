import RoomTypeImages from "@/app/components/RoomTypeImages";

async function getData(room_type_id, page = 1) {
  const url = `http://localhost:8000/rooms/room-types/${room_type_id}${
    page ? `?page=${page}` : ""
  }`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  console.log("API Response:", data);
  return data;
}

export default async function Page({ params, searchParams }) {
  const room_type_id = params.slug; // Get room_type_id from URL (e.g., /room-types/1)

  // Await searchParams to resolve dynamic query parameters
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page || 1; // Get page, default to 1

  const roomDetail = await getData(room_type_id, page); // Fetch data

  return (
    <section className="container my-5">
      <h3>{roomDetail.title}</h3>
      <div className="row">
        <div className="col-7">
          <RoomTypeImages images={roomDetail.images || []} />
          <h4 className="my-5">Amenities</h4>
          <div className="row">
            <div className="col-3">
              <p>
                Wifi: <i className="fa fa-check-circle text-success"></i>
              </p>
              <p>
                Swimming Pool: <i className="fa fa-check text-success"></i>
              </p>
              <p>
                Camera: <i className="fa fa-times-circle text-danger"></i>
              </p>
            </div>
          </div>
          <h4 className="my-5">Location</h4>
          <p>Google Map</p>
        </div>
      </div>
    </section>
  );
}