import { Pacifico, Fredoka } from 'next/font/google';

const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });
const fredoka = Fredoka({ subsets: ['latin'], weight: '600' });

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{ backgroundColor: '#7f005d' }}>
      <div className="container">
        <a className={`navbar-brand ${pacifico.className} fs-4`} style={{ color: '#7ff66d6' }} href="#">
          Bellissimo
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${fredoka.className}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3">
              <a className="nav-link text-white fw-bold" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link text-white fw-bold" href="#">Gallery</a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link text-white fw-bold" href="#">Services</a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link text-white fw-bold" href="#">About Us</a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link text-white fw-bold" href="#">Contact</a>
            </li>
            <li className="nav-item me-3">
              <a className="btn mt-1 text-white fw-bold" style={{ backgroundColor: '#68004c' }} href="#">Book Event</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
