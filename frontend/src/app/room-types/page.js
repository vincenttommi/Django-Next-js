import Link from "next/link";
import RoomType from "../components/RoomType";

async function getData() {
  const res = await fetch('http://localhost:8000/rooms/room-types');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  // Ensure we return the 'results' array from the API response
  const items = Array.isArray(data.results) ? data.results : (Array.isArray(data) ? data : Object.values(data));
  return items.filter(item => item && typeof item === 'object' && 'title' in item);
}

export default async function Page() {
  try {
    const roomtypes = await getData();

    const links = [];
    for(let i = 1; i <= roomtypes.length; i++) { // Changed roomtypes.count to roomtypes.length
      links.push(<Link className="page-link" href="#">{i}</Link>);
    }

    if (!Array.isArray(roomtypes)) {
      console.error('roomtypes is not an array:', roomtypes);
      return <div>Error: Failed to load room types</div>;
    }

    return (
      <section className="container my-5">
        <h3 className="my-4">Room Types({roomtypes.length})</h3>
        <div className="row text-center">
          {roomtypes.map((item, index) => ( // Changed from roomtypes.results to roomtypes
            <RoomType item={item} key={index} />
          ))}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            {
              links.map((item, index) => (
                <li className="page-item" key={index}>{item}</li> // Added key for React lists
              ))
            }
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </section>
    );
  } catch (error) {
    console.error('Error fetching room types:', error);
    return <div>Error: Could not load room types</div>;
  }
}