import Link from "next/link"


export default function  Page(){
    return(
        
    <section className="container my-5">
        <h3 className="my-4">Checkout</h3>
        <div className="row">
           <div className="col-6  offset-3">
            <h3 className="my-4">Checkout</h3>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                    <th>Total Guests</th>
                    <td>2</td>
                    </tr>
                    <tr>
                        <th>Total Rooms</th>
                        <td>3</td>
                    </tr>
                    <tr>
                        <th>Check-In Date</th>
                        <td>21/04/2025</td>
                    </tr>
                    <tr>
                        <th>Check-Out Date</th>
                        <td>22/04/2025</td>
                    </tr>
                    <tr>
                        <th>Total Amount</th>
                        <td>20000</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-danger">
                            *One Govt. ID required when checkin

                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <a href="#">Terms & Conditions</a>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button className="btn btn-secondary">Cancel</button>
                            <Link  href="/payment/success" className="btn  m-2  hms-color-dark">Pay Now(Success)</Link>
                            <Link href="/payment/failure" className="btn btn-danger hms-bg-dark m-2">Pay Now(Failure)</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
           </div>
        </div>
    </section>
    )        
}