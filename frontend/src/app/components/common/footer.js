import { Pacifico } from "next/font/google";
const  pacifico = Pacifico({ subsets:['latin'], weight:'400'})

export default function Footer(){
    return(
    <div className="container-fluid  py-3" style={{'backgroundColor':'#7f005d'}}>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <a className={`  ${pacifico.className} fs-4`} style={{ 'color':'#ff66d6'}} href="#">Bellissimo </a>
            <h6 className="text-white">Hotel Management System</h6>
          </div>
        </div>
        <div className="col-3">
           <h4>About</h4>
           <ul>
            <li>Company</li>
            <li>History</li>
            <li>Career</li>

           </ul>
        </div>
      </div>
    </div> 
    );  
}