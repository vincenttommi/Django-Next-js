import RoomType from "../components/RoomType";
import Link from "next/link";

async function getData(page = 1) {
    try {
        const response = await fetch(`http://localhost:8000/rooms/roomtypes/?page=${page}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { results: [], count: 0 }; // Fallback to prevent crashes
    }
}

export default async function Page({ searchParams }) {
    const currentPage = parseInt(searchParams?.page) || 1;
    const roomData = await getData(currentPage);
    
    // Extracting room types
    const roomtypes = roomData?.results || [];
    
    // Fixed pagination: Always show pages 1 to 10
    const totalPages = 10;

    return (
        <section className="container my-5">
            <h3 className="my-4">Room Types ({roomData.count})</h3>
            <div className="row text-center">
                {roomtypes.map((item, index) => (
                    <RoomType item={item} key={index} />
                ))}
            </div>

            {/* Pagination */}
            <nav className="text-center">
                <ul className="pagination">
                    {/* Previous Page */}
                    {currentPage > 1 && (
                        <li className="page-item">
                            <Link className="page-link" href={`?page=${currentPage - 1}`}>
                                Previous
                            </Link>
                        </li>
                    )}

                    {/* Page Numbers (1 to 10) */}
                    {[...Array(10)].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                            <Link className="page-link" href={`?page=${i + 1}`}>
                                {i + 1}
                            </Link>
                        </li>
                    ))}

                    {/* Next Page */}
                    {currentPage < totalPages && (
                        <li className="page-item">
                            <Link className="page-link" href={`?page=${currentPage + 1}`}>
                                Next
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </section>
    );
}
