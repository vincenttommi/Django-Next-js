import Link from "next/link";
import RoomType from "../../components/RoomType";

async function getRoomType(slug) {
  const res = await fetch(`http://localhost:8000/rooms/room-types/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch room type');
  }
  return res.json();
}

export default async function RoomTypePage({ params }) {
  const { slug } = params; // This will be "1", "2", "3", etc.

  try {
    const roomType = await getRoomType(slug);

    if (!roomType || typeof roomType !== 'object') {
      return <div>Room type not found</div>;
    }

    return (
      <section className="container my-5">
        <h3 className="my-4">Room Type: {roomType.title || 'Unknown'}</h3>
        <div className="row text-center">
          <RoomType item={roomType} />
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching room type:', error);
    return <div>Error: Could not load room type</div>;
  }
}