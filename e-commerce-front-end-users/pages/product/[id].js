import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 40px;
    margin-top: 40px;
`

export default function ProductPage({product}) {

    return(
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={product.images} />
                    </WhiteBox>

                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                    </div>
                    
                </ColWrapper>
            </Center>
        </>
    )
}


//  fetch Product (enhances SEO ie Google Search)
export async function getServerSideProps(context) {
    await mongooseConnect();

    // console.log(context.query);
    const {id} = context.query;

    const productInfo = await Product.findById(id);
    // console.log({productInfo});

    return {
        props: {
            product: JSON.parse(JSON.stringify(productInfo)),
        }
    }
}