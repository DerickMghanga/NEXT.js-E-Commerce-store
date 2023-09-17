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
                            {/* another Date format >>> {order.createdAt?.replace('T', ' ').substring(0, 19)} */}
                            <td>{new Date(order.createdAt)?.toString().replace('GMT+0300 (East Africa Time)', '')}</td> 
                            <td>
                                {order.name} {order.email} <br/>
                                {order.phoneNumber} <br/>
                                {order.city} {order.streetAddress} <br/>
                                {order.postalCode} {order.country} <br/>
                            </td>

                            <td>
                                {order.line_items.map(l => (
                                    <>
                                        {l.price_data?.product_data.name} x {l.quantity} <br/>
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