import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EditProductPage() {
    const router = useRouter();
    // console.log({router});
    const { id } = router.query; //Grab the Product Id

    useEffect(() => {
        axios.get('/api/products?id='+id)
    }, [id]);

    return (
        <Layout>
            edit product form here
        </Layout>
    );
}