//Add New Product Page
import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NewProduct() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [goToProducts, setGoToProducts] = useState(false);//Redirects back to Products page once a product has been added
    const router = useRouter();

    //This function will create a New Products via pages/api/products.js file
    async function createProduct(event) {
        event.preventDefault(); //Prevents default behaviour of the form which is GET request once we hit SAVE instead of POST
        const data = {title, description, price};
        await axios.post('/api/products', data);

        setGoToProducts(true);
    }

    if (goToProducts) {
        router.push('/products'); //Redirects back to products page once a product is added
    }

    return (
        <Layout>
            <form onSubmit={createProduct}>
                <h1>New Product</h1>

                <label>Product Name</label>
                <input type="text" placeholder="Product Name" value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <label>Product Description</label>
                <textarea placeholder="Product Description" value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <label>Product Price(in KES)</label>
                <input type="number" placeholder="Product Price" value={price}
                    onChange={e => setPrice(e.target.value)}
                />

                <button type="submit" className="btn-primary">SAVE</button>
            </form>
             
        </Layout>
    );
} 