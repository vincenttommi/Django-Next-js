'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function Page() {
  const [message, setMessage] = useState(null);
  const formRef = useRef(null);
  const router = useRouter();

  async function handleForm(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const data = {
      otp: formData.get('otp'),
    };

    try {
      const response = await fetch('http://localhost:8000/website/otp-validate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(resData.user));
        setMessage('✅ Password Changed Successfully.');
        formRef.current.reset();

        setTimeout(() => {
          router.push('/user/change-password');
        }, 1000);
      } else {
        if (resData.detail === 'Invalid email') {
          setMessage('❌ Error: Invalid email');
        } else {
          setMessage('❌ Error: ' + (resData.detail || 'Something went wrong.'));
        }
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setMessage('❌ Network error: Unable to connect to the server.');
    }
  }

  return (
    <section className="container my-5">
      <div className="row">
        <div className="col-10 offset-1">
          <div className="row">
            <div className="col-md-6 col-12">
              <img src="/banner1.jpeg" className="img-fluid" />
            </div>

            <div className="col-md-6 col-12">
              <h3 className="mb-3">OTP Validation</h3>

              {message && <p>{message}</p>}

              <form ref={formRef} onSubmit={handleForm}>
                <div className="row">
                  <div className="col-md-6 col-12 mb-3">
                    <label htmlFor="otp" className="form-label">OTP Validation</label>
                    <input
                      type="number"
                      name="otp"
                      className="form-control"
                      placeholder="***"
                      required
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <button type="submit" className="btn hms-color-dark m-2">Submit</button>
                  </div>

                  <p>
                    If you want to change your password, <Link href="/user/change_password">Click here</Link>
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
