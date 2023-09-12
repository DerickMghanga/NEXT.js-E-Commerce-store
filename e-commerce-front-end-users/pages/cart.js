import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    margin-top: 30px;
`
const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 25px;
`
const ProductInfoCell = styled.td`
    padding: 10px 0;
    border: 1px solid rgba(0,0,0,.1);
`
const ProductImageBox = styled.div`
    width: 90px;
    height: 90px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;

    img{
        max-width: 70px;
        max-height: 70px;   
    }
`

export default function CartPage() {

    const {cartProducts} = useContext(CartContext);  //saved as ids

    const[products, setProducts] = useState([]);

    // fetch all products from DB api using POST request
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids:cartProducts }).then(response => {
                setProducts(response.data);
            })
        }
    }, [cartProducts]);

    return (
        <>
            <Header />

            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {!cartProducts.length && (
                            <div>Your Cart is empty!</div>
                        )}

                        {/* Cart Products display */}
                        {products.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price(KES)</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} alt="image" />
                                                </ProductImageBox>
                                                {product.title}
                                            </ProductInfoCell>

                                            <td>{cartProducts.filter((id) => id === product._id).length}</td>
                                            <td>{product.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}

                    </Box>

                    {/* This Box only appears if we have items in the Cart */}
                    {!!cartProducts?.length && (   // convert to boolean using '!!'
                        <Box>
                            <h3>Order Information</h3>
                            <input type="text" placeholder="Address"/>
                            <input type="text" placeholder="Address 2"/>
                        <Button block black >Continue to Payment</Button>
                        </Box>
                    )}
                    
                </ColumnsWrapper>
            </Center>
            
        </>
    )
}