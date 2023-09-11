import { styled } from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";  //re-susable Icon component
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 3rem;
`
const Desc = styled.p`
    color: #aaa;
    font-size: .9rem;
`
const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.1fr .9fr;
    gap: 40px;

    img{
        max-width: 100%
    }
`
const Column = styled.div`
    display: flex;
    align-items: center;
`
const ButtonsWrapper = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 25px;
`

export default function Featured({product}) {

    const {addProduct} = useContext(CartContext); //from CartContext.Provider

    function addFeaturedToCart() {
        addProduct(product._id);  // New product added to the previous products saved in the cart
    }

    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product.title}</Title>

                            <Desc>{product.description}</Desc>

                            <ButtonsWrapper>
                                <ButtonLink href={'/products/'+product._id} outline={1} white={1} >Read More...</ButtonLink>

                                <Button white onClick={addFeaturedToCart}>

                                    <CartIcon />
                                    Add to cart
                                </Button>
                            </ButtonsWrapper>

                        </div>
                    </Column>

                    <Column>
                        <img src="https://next.js-e-commerce.s3.amazonaws.com/1694172427926.png" alt="mac book pro"/>
                    </Column>
                </ColumnsWrapper>
                
            </Center>
        </Bg>
    )
}