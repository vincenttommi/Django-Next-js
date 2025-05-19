'use client'
import Link from "next/link";
import { useState } from "react";



export default function Page(){

 const  [email, setEmail] = useState('')
 const  [message, setMessage] = useState('')
 const [error, setError] = useState('')


 const  handleSubmit = async (e) =>{
    e.preventDefault()
    setMessage('')
    setError('')

    try{
      const  res = await fetch('http://localhost:8000/website/password-reset-request/',{
        method :'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({ email }),
      })
      if(!res.ok){

        const  errorData = await res.json()
        throw new Error(errorData?.email || 'Something went wrong')
      }

      const data =  await  res.json()
      setMessage(data.message)
    } catch(err){
      setError(err.message)
    }
 }
  return(
   
    <section className="container my-5">
      <div className="row">
        <div className="col-10 offset-1">
          <div className="row">
            <div className="col-md-6 col-12">
              <img src="/banner1.jpeg" className="img-fluid" />
            </div>

            <div className="col-md-6 col-12">
              <h3 className="mb-3">Forget Password</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn hms-color-dark m-2">Submit</button>
                </div>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
              </form>

              <p>
                Click, <Link href="/user/otp_validation">To verify your OTP</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}