import BarChart from "@/app/components/user/BarChart";
import DashboardSidebar from "@/app/components/user/DashboardSidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BarChart from "@/app/components/user/BarChart";
import DashboardSidebar from "@/app/components/user/DashboardSidebar";
import Link from "next/link";


export default function Page(){
    
    useEffect(()=>{
        const checkAuth = async () =>{
            const response = await fetch('http://localhost:8000/website/check-auth',{
                credentials: 'include',
            });
            if(!response.ok){
                router.push('/login');
            }
        };
        checkAuth();
    },[router]);

    return(
      <section  className="container m-5 ">
        <div className="row">
            <div className="col-md-4 col-12">
                  <DashboardSidebar />
            </div>
            <div className="col-md-8 col-12">
                    <div className="row">
                     <div className="col-6 text-center p-3 ">
                       <div className="card">
                        <h3 className="card-header">Total Bookings</h3>
                        <div className="card-body">
                        <h4><Link href="#">200</Link></h4>
                        </div>
                        </div>
                    </div>

                    <div className="col-6 text-center p-3">
                        <div className="card">
                            <h3 className="card-header">Total Payments</h3>
                            <div className="card-body">
                                <h4><Link href="#">50000</Link></h4>
                            </div>
                        </div>
                        
                    </div>                  

                </div>

                {/* chart start */}
                <div className="row  my-4">
                    <div className="col-12"  id="paymentChart">
                        <BarChart/>
                    </div>

                </div>
            </div>
        </div>
      </section>
    );
}