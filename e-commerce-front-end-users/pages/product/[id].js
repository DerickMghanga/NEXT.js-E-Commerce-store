import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin: 40px 0;

    @media screen and (min-width: 768px) {
        grid-template-columns: 0.8fr 1.2fr;
    }
`
const PriceRow = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
`
const Price = styled.span`
    font-size: 1.3rem;
`

export default function ProductPage({product}) {

    const {addProduct} = useContext(CartContext);

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
                        
                        <PriceRow>
                            <div>
                                <Price>${product.price}</Price>
                            </div>
                            <div>
                                <Button primary outline onClick={()=> addProduct(product._id)} >
                                    <CartIcon/> Add to Cart
                                </Button>
                            </div>
                        </PriceRow>
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