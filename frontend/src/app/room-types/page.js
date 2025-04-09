import RoomType from "../components/RoomType";
import Link from "next/link";

export default async function Page() {
  let roomtypes = [];
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

    const data = await res.json();

    console.log('API Response:', data);

    // Extract the results array from the API response
    if (data.results && Array.isArray(data.results)) {
      roomtypes = data.results;
    } else {
      roomtypes = [];
      console.warn('Unexpected API response format or no results found:', data);
    }
  } catch (err) {
    error = err.message;
    console.error('Error fetching room types:', err);
  }

  if (error) {
    return (
      <section className="container my-5">
        <div className="alert alert-danger">Error loading room types: {error}</div>
      </section>
    );
  }

  if (roomtypes.length === 0) {
    return (
      <section className="container my-5">
        <div>No room types available</div>
      </section>
    );
  }

  return (
    <section className="container my-5">
      <h3 className="my-4">Room Types({roomtypes.length})</h3>
      <div className="row text-center">
        {roomtypes.map((item) => (
          <RoomType item={item} key={item.id} /> 
        ))}
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