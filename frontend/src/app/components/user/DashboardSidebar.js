"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <div className="list-group">
            <Link className={`list-group-item ${pathname === '/user/dashboard' ? 'hms-bg-normal' : ''}`} href="/user/dashboard">Dashboard</Link>
            <Link className={`list-group-item ${pathname === '/user/booking_history' ? 'hms-bg-normal' : ''}`} href="/user/booking_history">Booking history</Link>
            <Link className={`list-group-item ${pathname === '/user/event_booking_history' ? 'hms-bg-normal' : ''}`} href="/user/event_booking_history">Event Booking History</Link>
            <Link className={`list-group-item ${pathname === '/user/payment_logs' ? 'hms-bg-normal' : ''}`} href="/user/payment_logs">Payment logs</Link>
            <Link className={`list-group-item ${pathname === '/user/profile_update' ? 'hms-bg-normal' : ''}`} href="/user/profile_update">Profile Update</Link>            
            <Link className="list-group-item text-danger" href="#">Logout</Link>
        </div>
    );
}
