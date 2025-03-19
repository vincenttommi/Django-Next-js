import RoomType from "../components/RoomType";
import Link from "next/link";

async function getData(){
    try{
        const response = await fetch('http://localhost:8000/rooms/roomtypes/');

        if (!response.ok){
            throw new Error(`HTTP error ! status: ${response.status}`);
        }

        const data  = await response.json(); // converting the response to a json object
        return data;
    } catch (error){
        console.error('Error fetching data:', error)
    }
  }

   



export default async function Page(){
   
      const roomData = await getData();
    //Extracting the results  array from the paginated response
    const roomtypes = roomData?.results || [];

    return(
    <section className="container my-5">
        <h3 className="my-4">Room Types(6)</h3>
        <div className="row text-center">
           {
            roomtypes.map((item, index)=>(
                <RoomType item={item} key={index} />
              ))}
        </div>
    <nav className="text-center">
        <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
</nav>

    </section>
    )
}