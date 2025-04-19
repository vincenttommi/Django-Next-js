import { Pacifico, Fredoka } from 'next/font/google';
import Link from 'next/link';

const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });
const fredoka = Fredoka({ subsets: ['latin'], weight: '600' });

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg hms-bg-normal" data-bs-theme="dark"  >
      <div className="container">
        <Link className={`navbar-brand ${pacifico.className} fs-4 hms-color-light`}  href="/">
          Bellissimo
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${fredoka.className}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3">
              <Link href='/' className="nav-link text-white fw-bold" aria-current="page">Home</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link text-white fw-bold" href="#">Gallery</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link text-white fw-bold" href="#">Services</Link>
            </li>
            <li className="nav-item me-3">
            <Link href="/about" className="nav-link text-white fw-bold">About Us</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link text-white fw-bold" href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/user/signup" className='btn mt-1 me-2  text-white fw-bold  bg-success'>SignUp</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="btn mt-1 text-white " href="/user/book_event">Book Event</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
