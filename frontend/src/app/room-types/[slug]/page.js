import RoomTypeImages from "@/app/components/RoomTypeImages";
import Link from "next/link";

async function getData(id) {
  if (!id) {
    throw new Error('Invalid room ID: ID is undefined or empty');
  }

  // Ensure id is a number (convert string to number if possible)
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error('Invalid room ID: ID must be a number');
  }

  try {
    const res = await fetch(`http://localhost:8000/rooms/room-types/${numericId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch room details: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Fetched room data:', data); // Log the data to the console
    return data;
  } catch (error) {
    console.error('Error in getData:', error);
    throw error;
  }
}

export default async function Page({ params }) {
  // Ensure params.id is accessed correctly
  const { id } = params || {};

  // Log the params to debug
  console.log('Received params:', params);

  // Validate that id is not undefined or empty
  if (!id) {
    console.error('Invalid room ID:', id);
    return <div>Error: Invalid room ID. Please check the URL.</div>;
  }

  let roomDetail;

  try {
    roomDetail = await getData(id);
    console.log('Room detail in component:', roomDetail); // Log the room detail in the component
  } catch (error) {
    console.error('Error loading room details:', error);
    return <div>Error loading room details: {error.message}</div>;
  }

  // Fallback values if data is missing
  const roomImages = roomDetail.room_type_images || [];
  const hasWifi = roomDetail.detail?.wifi || false;
  const roomTitle = roomDetail.title || 'Unknown Room';
  const roomPrice = roomDetail.price || 0;

  return (
    <section className="container my-5">
      <div className="row">
        <div className="col-7">
          <RoomTypeImages images={roomImages} /> {/* Show images related to room */}
          <h4 className="my-5">Amenities</h4>
          <div className="row">
            <div className="col-3">
              <p>
                Wifi: {hasWifi ? (
                  <span><i className="fa fa-check-circle text-success"></i></span>
                ) : (
                  <span><i className="fa fa-times-circle text-danger"></i></span>
                )}
              </p>
              <p>Swimming Pool: <i className="fa fa-check-circle text-success"></i></p>
              <p>Camera: <i className="fa fa-times-circle text-danger"></i></p>
            </div>
          </div>
          <h4 className="my-3">Location</h4>
          <p>Google Map</p>
        </div>

        <div className="col-5">
          <div className="card">
            <h5 className="card-header hms-color-dark">Booking Form</h5>

            <div className="card-body">
              <div className="mb-3">
                <label className="form-label"><b>Room Type:</b> {roomTitle}</label>
              </div>
              <div className="mb-3">
                <label className="form-label"><b>Charges:</b> {roomPrice}/Night</label>
              </div>

              <hr />

              <div className="mb-3">
                <label className="form-label"><b>Total Guests</b></label>
                <input type="number" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label"><b>Check-In</b></label>
                <input type="date" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label"><b>Check-Out</b></label>
                <input type="date" className="form-control" />
              </div>
              <Link href={`/checkout?id=${id}`} className="btn hms-color-dark mt-3">
                Confirm Booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}