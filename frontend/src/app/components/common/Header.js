"use client"; // Mark this component as client-side

import { Pacifico, Fredoka } from 'next/font/google';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });
const fredoka = Fredoka({ subsets: ['latin'], weight: '600' });

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Access localStorage only in the browser
    try {
      const storedUser = localStorage.getItem('user');
      
      // Check for valid JSON and remove invalid data
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem('user'); // Clean up invalid user data
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('user'); // Clean up invalid data
    }
  }, []); // Empty dependency array to run once on mount

  // Log user for debugging (optional)
  console.log(user);

  return (
    <nav className="navbar navbar-expand-lg hms-bg-normal" data-bs-theme="dark">
      <div className="container">
        <Link className={`navbar-brand ${pacifico.className} fs-4 hms-color-light`} href="/">
          Bellissimo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${fredoka.className}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3">
              <Link href="/" className="nav-link text-white fw-bold" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link text-white fw-bold" href="#">
                Gallery
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link text-white fw-bold" href="#">
                Services
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link href="/about" className="nav-link text-white fw-bold">
                About Us
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link text-white fw-bold" href="/contact">
                Contact Us
              </Link>
            </li>
           
              <li className="nav-item">
                <Link className="btn mt-1 me-3 text-white fw-bold bg-success" href="/user/signup">
                  SignUp
                </Link>
              </li>
            <li className="nav-item me-3">
              <Link className="nav-link text-white fw-bold btn me-3 text-white" href="/user/book_event">
                Book Event
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
