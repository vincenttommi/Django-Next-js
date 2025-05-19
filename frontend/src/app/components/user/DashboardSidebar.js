'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const storedTokens = localStorage.getItem('tokens');
      if (!storedTokens) throw new Error('No tokens found in storage');
  
      const { access, refresh } = JSON.parse(storedTokens);
  
      const res = await fetch('http://localhost:8000/website/logout/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ refresh_token: refresh }),
      });
  
      if (!res.ok) {
        let errorMessage = `Logout failed with status ${res.status}`;
        try {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            errorMessage = data?.detail || JSON.stringify(data);
          } else {
            const text = await res.text();
            errorMessage = text || errorMessage;
          }
        } catch (err) {
          console.warn('Could not parse error response:', err);
        }
  
        throw new Error(errorMessage);
      }
  
      // ✅ Clear tokens and redirect
      localStorage.removeItem('tokens');
      localStorage.removeItem('user');
      router.push('/user/login');
    } catch (err) {
      console.error('Logout error:', err?.message || err);
    }
  };  
  return (
    <div className="list-group">
      <Link className={`list-group-item ${pathname === '/user/dashboard' ? 'hms-bg-normal' : ''}`} href="/user/dashboard">Dashboard</Link>
      <Link className={`list-group-item ${pathname === '/user/booking_history' ? 'hms-bg-normal' : ''}`} href="/user/booking_history">Booking history</Link>
      <Link className={`list-group-item ${pathname === '/user/event_booking_history' ? 'hms-bg-normal' : ''}`} href="/user/event_booking_history">Event Booking History</Link>
      <Link className={`list-group-item ${pathname === '/user/payment_logs' ? 'hms-bg-normal' : ''}`} href="/user/payment_logs">Payment logs</Link>
      <Link className={`list-group-item ${pathname === '/user/profile_update' ? 'hms-bg-normal' : ''}`} href="/user/profile_update">Profile Update</Link>            
      <button className="list-group-item text-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
}
