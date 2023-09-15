import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {

    const[orders, setOrders] = useState([]);

    //fetch all orders from DB once we mount the component
    useEffect(() => {
        axios.get('/api/order').then(response => {
            setOrders(response.data);
        })
    }, []);

    return(
        <Layout>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr>
                            <td>{order.createdAt}</td>
                            <td>
                                {order.name} {order.email} <br/>
                                {order.phoneNumber} <br/>
                                {order.city} {order.streetAddress} <br/>
                                {order.postalCode} {order.country} <br/>
                            </td>

                            <td>
                                {order.line_items.map(l => (
                                    <>
                                        {l.price_data.product_data.name}
                                        {JSON.stringify(l)}
                                    </>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}