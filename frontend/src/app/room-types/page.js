import RoomType from "../components/RoomType";
import Link from "next/link";

export default async function Page() {
  let roomTypes = [];
  let error = null;

  try {
    const res = await fetch('http://localhost:8000/rooms/room-types/', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json(); // Get the raw API response

    // Log the data to debug
    console.log('API Response:', data);

    // Adjust this based on your API's response structure
    if (Array.isArray(data)) {
      roomTypes = data; // If the response is already an array
    } else if (data.data && Array.isArray(data.data)) {
      roomTypes = data.data; // If the response is { data: [], meta: {} }
    } else {
      roomTypes = []; // Fallback: empty array if data is not as expected
      console.warn('Unexpected API response format:', data);
    }
  } catch (err) {
    error = err.message;
    console.error('Error fetching room types:', err);
  } 

  if (error) {
    return (
      <section className="container my-5">
        <div>Error loading room types: {error}</div>
      </section>
    );
  }

  return (
    <section className="container my-5">
      <h3 className="my-4">Room Types({roomTypes.length})</h3>
      <div className="row text-center">
        {roomTypes.length > 0 ? (
          roomTypes.map((room, index) => (
            <RoomType key={index} room={room} />
          ))
        ) : (
          <div>No room types available</div>
        )}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </section>
  );
}