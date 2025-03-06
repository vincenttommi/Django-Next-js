import { Pacifico } from "next/font/google";
import Link from "next/link";
const  pacifico = Pacifico({ subsets:['latin'], weight:'400'})

export default function Footer(){
    return(
    <footer className="container-fluid  py-3" style={{'backgroundColor':'#7f005d'}}>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Link className={`  ${pacifico.className} fs-4`} style={{ 'color':'#ff66d6'}} href="#">Bellissimo </Link>
            <h6 className="text-white">Book with us $ enjoy your holiday</h6>
          </div>

        <div className="col-3">
          <h4 className="text-white">About</h4>
          <p><Link href="#" className="text-white text-decoration-none">Company</Link></p>
          <p><Link href="#" className="text-white text-decoration-none">History</Link></p>
          <p><Link href="#" className="text-white text-decoration-none">Career</Link></p>
        </div>
        <div className="col-3">
          <h4 className="text-white">Contact</h4>
          <p>
            <Link href="#" className="text-white text-decoration-none  me-2 ">
          <i className="fa fa-facebook"></i> 
          </Link>
          <Link href="#" className="text-white text-decoration-none me-2 ">
          <i className="fa fa-whatsapp"></i> 
          </Link>
          <Link href="#" className="text-white text-decoration-none me-2 ">
          <i className="fa fa-twitter"></i> 
          </Link>
          <Link href="#" className="text-white text-decoration-none me-2 ">
          <i className="fa fa-instagram"></i> 
          </Link>
          <Link href="#" className="text-white text-decoration-none  ">
          <i className="fa fa-linkedin"></i> 
          </Link>
          </p>
          <p><Link href="/contact" className="text-white text-decoration-none">Send Message</Link></p>
          
        </div>
        <div className="col-3">
          <h4 className="text-white">Support</h4>
          <p><Link href="#" className="text-white text-decoration-none">Privacy Policy</Link></p>
          <p><Link href="#" className="text-white text-decoration-none">Terms & Conditions</Link></p>
          <p><Link href="#" className="text-white text-decoration-none">Help</Link></p>
        </div>
        </div>
      </div>
    </footer> 
    );  
}