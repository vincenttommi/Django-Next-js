"use client"; // Mark this file as a Client Component

import BarChart from "@/app/components/user/BarChart";
import DashboardSidebar from "@/app/components/user/DashboardSidebar";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { useEffect } from "react";

export default function Page() {
  const router = useRouter(); // Define router using useRouter hook

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("http://localhost:8000/website/check-auth", {
        credentials: "include",
      });
      if (!response.ok) {
        router.push("");
      }
    };
    checkAuth();
  }, [router]); // Add router to dependency array

  return (
    <section className="container m-5">
      <div className="row">
        <div className="col-md-4 col-12">
          <DashboardSidebar />
        </div>
        <div className="col-md-8 col-12">
          <div className="row">
            <div className="col-6 text-center p-3">
              <div className="card">
                <h3 className="card-header">Total Bookings</h3>
                <div className="card-body">
                  <h4>
                    <Link href="#">200</Link>
                  </h4>
                </div>
              </div>
            </div>

            <div className="col-6 text-center p-3">
              <div className="card">
                <h3 className="card-header">Total Payments</h3>
                <div className="card-body">
                  <h4>
                    <Link href="#">50000</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Chart start */}
          <div className="row my-4">
            <div className="col-12" id="paymentChart">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}