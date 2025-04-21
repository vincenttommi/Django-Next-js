'use client';

import Link from "next/link";
import { useRef, useState } from "react";




export default function Page() {
 const [message, setMessage] = useState(null);
 const formRef = useRef(null);


 async function handleForm(e) {
   e.preventDefault();
   const formData = new FormData(formRef.current);


   const data = {
     email: formData.get('email'),
     password: formData.get('password'),
   };
   try {
     const response = await fetch('http://localhost:8000/website/login/', {
       method: 'POST',
       body: JSON.stringify(data),
       headers: {
         'Content-Type': 'application/json',
       },
     });


     if (response.ok) {
       setMessage("✅ Login successful.");
       formRef.current.reset();
     } else {
       const resData = await response.json();
       // Handle common login errors 
       if (resData.detail === 'Invalid credentials') {
         setMessage('❌ Error: Invalid email or password.');
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
             <h3 className="mb-3">Login</h3>


             {message && (
               <div className="alert alert-info" role="alert">
                 {message}
               </div>
             )}


             <form onSubmit={handleForm} ref={formRef}>
               <div className="row"> 




               <div className="col-md-6 col-1 mb-3">
                   <label htmlFor="email" className="form-label">Email</label>
                   <input type="email" className="form-control" name="email" required />
                 </div>
                 <div className="col-md-6 col-12 mb-4">
                   <label htmlFor="password" className="form-label">Password</label>
                   <input type="password" className="form-control" name="password" required />
                 </div>
                 <div className="col-md-6 col-12 mb-3">
  
                   <button type="submit" className="btn hms-color-dark m-2">Submit</button>
                 </div>
                 <p>
                   Not registered? <Link href="/user/signup">SignUp here</Link>
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


