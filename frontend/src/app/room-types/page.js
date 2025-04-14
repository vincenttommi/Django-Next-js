import Link from "next/link";
import RoomType from "../components/RoomType";

async function getData(page_no) {
  console.log(`Fetching data for page ${page_no}`);
  const res = await fetch(`http://localhost:8000/rooms/room-types/?page=${page_no}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  console.log("API Response:", data);
  return data;
}

export default async function Page({ searchParams }) {
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  console.log("Current page:", page);
  let roomtypes = [];
  let count = 0;
  let totalPages = 1;
  let error = null;

  try {
    const data = await getData(page);
    roomtypes = data.results && Array.isArray(data.results) ? data.results : [];
    count = data.count || 0;
    const pageSize = 10; // Confirm with API
    totalPages = count > 0 ? Math.ceil(count / pageSize) : 1;
  } catch (err) {
    error = err.message;
  }

  if (error) return <div className="container my-5">Error: {error}</div>;
  if (roomtypes.length === 0) return <div className="container my-5">No room types available</div>;

  return (
    <section className="container my-5">
      <h3 className="my-4">Room Types ({count})</h3>
      <div className="row text-center">
        {roomtypes.map((item) => (
          <RoomType item={item} key={item.id} />
        ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {/* Previous Link */}
          <li className="page-item">
            {page > 1 ? (
              <Link className="page-link" href={`/room-types?page=${page - 1}`}>
                Previous
              </Link>
            ) : (
              <span className="page-link disabled" aria-disabled="true">
                Previous
              </span>
            )}
          </li>

          {/* Page Number Links */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
            <li className="page-item" key={pageNum}>
              <Link
                className={`page-link ${page === pageNum ? "active" : ""}`}
                href={`/room-types?page=${pageNum}`}
              >
                {pageNum}
              </Link>
            </li>
          ))}

          {/* Next Link */}
          <li className="page-item">
            {page < totalPages ? (
              <Link className="page-link" href={`/room-types?page=${page + 1}`}>
                Next
              </Link>
            ) : (
              <span className="page-link disabled" aria-disabled="true">
                Next
              </span>
            )}
          </li>
        </ul>
      </nav>
    </section>
  );
}