import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    // console.log({router});
    const { id } = router.query; //Grab the Product Id form the route

    useEffect(() => {   //Once the page loads the Product is fetched from DB
        if (!id) {
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            // console.log(response.data);
            setProductInfo(response.data);
        });
    }, [id]);

    return (
        <Layout>
            <h1>Edit Product</h1>

            {/* Displays the current product info to the ProductForm component before editing */}
            {productInfo && ( <ProductForm {...productInfo}/> )}  

        </Layout>
    );
}