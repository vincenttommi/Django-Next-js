"use client"; // Add this at the top

import Link from "next/link";
import { useParams } from "next/navigation";

export default function PaymentSuccess() {
    const params = useParams(); // Get params from URL
    const slug = params?.slug; // Ensure params exist before accessing slug

    return (
        <>
            <h3 className="text-success"><i className="fa fa-check-circle"></i></h3>
            <h5>Invoice: <Link href="#">Bellissimo-001</Link></h5>
            <p className="my-4">
                <Link href="#" className="btn btn-dark">Home</Link>
                <Link href="#" className="btn hms-color-dark">My Dashboard</Link>
            </p>
        </>
    );
}
