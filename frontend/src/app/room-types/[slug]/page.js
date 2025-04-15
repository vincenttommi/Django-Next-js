import RoomTypeImages from "@/app/components/RoomTypeImages";



async function getData(room_type_id) {
 
  const  res = await fetch('http://localhost:8000/rooms/room-types/'+room_type_id, {cache:'no-store'});
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  console.log("API Response:", data);
  return data;
}


export default async function Page(){



  const  room_type_id = 1
  const page  =  searchParams.page;
  const  roomDetail = await getData(page);



  return(
    <section  className="container my-5">
      <h3>{roomDetail.title}</h3>
      <div className="row">
        <div className="col-7">
          <RoomTypeImages/>
          <h4 className="my-5">Amentities</h4>
          <div className="row">
            <div className="col-3">
              <div className="col-3">

                <p>Wifi:<i className="fa fa-check-circle text-success"></i></p>
                <p>Swimming Pool:<i className="fa fa-check text-success"></i></p>
                <p>Camera:<i className="fa fa-times-circle text-danger"></i></p>

              </div>
            </div>
            <h4 className="my-5">Location</h4>
            <p>Google Map</p>
          </div>
        </div>
      </div>
    </section>
  )
}