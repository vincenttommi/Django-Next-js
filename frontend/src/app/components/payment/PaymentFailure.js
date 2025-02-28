import Link from "next/link";

export default function PaymentFailure(){

    return(

        <>
        <h3 className="text-danger my-4"><i className="fa fa-check-circle">Ooops Something  wrong happened</i></h3>
        <h5 className="text-danger">Error Description: Error Code</h5>
        <p className="my-4">
            <Link href="#" className="btn btn-dark">Home</Link>
            <Link href="#" className="btn  hms-color-dark ms-2">My Dashboard</Link>
        </p>
        </>
    )
}