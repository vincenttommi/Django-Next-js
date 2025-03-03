
import DashboardSidebar from "@/app/components/user/DashboardSidebar";
import Link from "next/link";
export default function Page(){
  return(
      <section  className="container m-5 ">
        <div className="row">
            <div className="col-md-4 col-12">
                  <DashboardSidebar/>
            </div>
            

            <div className="col-md-8 col-12">
            </div>
        </div>
      </section>
    );
}