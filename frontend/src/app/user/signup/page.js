'use client';

import { useState, useRef } from "react";
import Link from "next/link";

export default function Page() {
  const [message, setMessage] = useState(null);
  const formRef = useRef(null);

  async function handleForm(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const data = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      username: formData.get('username'),
      password: formData.get('password'),
      email: formData.get('email'),
      profile: {
        mobile: formData.get('mobile'),
      },
    };

    try {
      const response = await fetch('http://localhost:8000/website/signup/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMessage("✅ Signup successful! Code has been sent.");
        formRef.current.reset();
      } else {
        const resData = await response.json();
        // Handle specific errors (e.g., username or email already exists)
        if (resData.username) {
          setMessage("❌ Error: Username already exists.");
        } else if (resData.email) {
          setMessage("❌ Error: Email already exists.");
        } else {
          setMessage("❌ Error: " + (resData?.detail || "Something went wrong."));
        }
      }
    } catch (error) {
      setMessage("❌ Fetch error: " + error.message);
    }
  }

  return (
    <section className="container my-5">
      <div className="row">
        <div className="col-10 offset-1">
          <div className="row">
            <div className="col-md-6 col-12">
              <img src="/banner1.jpeg" className="img-fluid" alt="Banner" />
            </div>
            <div className="col-md-6 col-12">
              <h3 className="mb-3">SignUp</h3>

              {message && (
                <div className="alert alert-info" role="alert">
                  {message}
                </div>
              )}

              <form onSubmit={handleForm} ref={formRef}>
                <div className="row">
                  <div className="col-md-6 col-12 mb-4">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" name="first_name" required />
                  </div>
                  <div className="col-md-6 col-12 mb-4">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="last_name" required />
                  </div>
                  <div className="col-md-6 col-12 mb-4">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" required />
                  </div>
                  <div className="col-md-6 col-12 mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" required />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile</label>
                    <input type="text" className="form-control" name="mobile" required /> {/* Changed to text for international formats */}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" required />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <button type="reset" className="btn btn-secondary">Reset</button>
                    <button type="submit" className="btn hms-color-dark m-2">Submit</button>
                  </div>
                  <p>
                    Already registered? <Link href="/user/login">Login here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}