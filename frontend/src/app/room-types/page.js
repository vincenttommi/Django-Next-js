import Link from "next/link";
import RoomType from "../components/RoomType";

async function getData(page_no) {
  const res = await fetch(`http://localhost:8000/rooms/room-types/?page=${page_no}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  const items = Array.isArray(data.results) ? data.results : (Array.isArray(data) ? data : Object.values(data));
  return items.filter(item => item && typeof item === 'object' && 'title' in item);
}

export default async function Page({ searchParams }) {
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  try {
    const roomtypes = await getData(page);

    const links = [];
    const totalPages = roomtypes.length > 0 ? Math.ceil(roomtypes.length / 10) : 1;

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <Link className="page-link" href={`/room-types?page=${i}`} key={i}>
          {i}
        </Link>
      );
    }

    if (!Array.isArray(roomtypes)) {
      return <div>Error: Failed to load room types</div>;
    }

    return (
      <section className="container my-5">
        <h3 className="my-4">Room Types({roomtypes.length})</h3>
        <div className="row text-center">
          {roomtypes.map((item, index) => (
            <RoomType item={item} key={index} />
          ))}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <Link className="page-link" href={page > 1 ? `/room-types?page=${page - 1}` : '#'} aria-disabled={page <= 1}>
                Previous
              </Link>
            </li>
            {links.map((item, index) => (
              <li className="page-item" key={index}>
                {item}
              </li>
            ))}
            <li className="page-item">
              <Link className="page-link" href={page < totalPages ? `/room-types?page=${page + 1}` : '#'} aria-disabled={page >= totalPages}>
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    );
  } catch (error) {
    console.error('Error fetching room types:', error);
    return <div>Error: Could not load room types</div>;
  }
}