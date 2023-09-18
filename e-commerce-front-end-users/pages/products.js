import Header from "@/components/Header";
import Center from "@/components/Center";
import { styled } from "styled-components";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title"; 

export default function ProductsPage({products}) {
    // console.log({products});

    return (
        <>
            <Header />
            <Center>
                <Title>All Products</Title>
                <ProductsGrid products={products}/>
            </Center>
        </>
    )
}

//fetch all Products from the Database
export async function getServerSideProps() {

    await mongooseConnect();

    const ProductsInfo = await Product.find({}, null, {sort:{'_id':-1}});

    return{
        props: {
            products: JSON.parse(JSON.stringify(ProductsInfo)),
        }
    }
}