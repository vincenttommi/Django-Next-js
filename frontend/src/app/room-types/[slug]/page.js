import RoomTypeImages from "@/app/components/RoomTypeImages";

async function getData(room_type_id, page = 1) {
  const url = `http://localhost:8000/rooms/room-types/${room_type_id}${
    page ? `?page=${page}` : ""
  }`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  console.log("API Response:", JSON.stringify(data, null, 2));
  return data;
}

export default async function Page({ params, searchParams }) {
  const { slug } = params; // ✅ FIXED
  const { page = 1 } = searchParams || {}; // ✅ FIXED

  let roomDetail;
  try {
    roomDetail = await getData(slug, page);
  } catch (error) {
    return <div>Error fetching room details: {error.message}</div>;
  }

  // Transform relative image URLs to absolute
  const images = Array.isArray(roomDetail?.room_type_images)
    ? roomDetail.room_type_images.map((img) => ({
        image: img.image.startsWith("http")
          ? img.image
          : `http://localhost:8000${img.image}`,
      }))
    : [];

  return (
    <section className="container my-5">
      <h3>{roomDetail.title || "Room Details"}</h3>
      <div className="row">
        <div className="col-7">
          <RoomTypeImages images={images} />
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



        <div className="col-5">
        <div className="card">
          <h5 className="card-header hms-bg-normal">Booking Form</h5>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label"><b>Room Type</b>Double Room  </label>
              

            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label"><b>charges:</b>3000ksh per Night  </label>
            </div>
            <hr /><div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Check-In</label>
              <input type="date" className="form-control"/>

            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Total Guests</label>
              <input type="number" className="form-control" />

            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Check-In</label>
              <input type="date" className="form-control"/>

            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Check Out</label>
              <input type="date" className="form-control"/>

            </div>
            <button className="btn btn hms-color-dark">Confirm Booking</button>
          </div>
        </div>

      </div>
      </div>
    </section>
  );
}
