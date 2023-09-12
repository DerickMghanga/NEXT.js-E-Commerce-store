import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
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
const QuantityLabel = styled.span`
    padding: 0 5px;
    margin: 0 5px;
`

const CityHolder = styled.div`
    display: flex;
    gap: 6px;
`

export default function CartPage() {

    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);  //saved as ids

    const[products, setProducts] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');

    // fetch all products from DB api using POST request
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids:cartProducts }).then(response => {
                setProducts(response.data);
            })
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    // add more product button
    function moreOfThisProduct(id) {
        addProduct(id);
    }

    // remove produci
    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    let total = 0;
    for (const productId of cartProducts) {  
        const price = products.find(p => p._id === productId)?.price || 0; //find price for the products
        total += price;
    }

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
                                        <th>Price</th>
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

                                            <td>
                                                <Button onClick={() => lessOfThisProduct(product._id)}> - </Button>

                                                <QuantityLabel>
                                                    {cartProducts.filter((id) => id === product._id).length}
                                                </QuantityLabel>

                                                <Button onClick={() => moreOfThisProduct(product._id)} > + </Button>
                                            </td>

                                            <td>
                                                KES {product.price * cartProducts.filter((id) => id === product._id).length}
                                            </td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td></td>

                                        <td>
                                        <Button primary red onClick={() =>clearCart()}>Clear Cart!</Button>
                                        </td>
                                        
                                        <td>KES {total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}

                    </Box>

                    {/* This Box appears ONLY if we have items in the Cart */}
                    {!!cartProducts?.length && (   // converts to boolean using '!!'
                        <Box>
                            <h3>Order Information</h3>

                            <form method="post" action='/api/checkout'>
                                <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/>
                                <Input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <Input type="text" placeholder="Street / Home Address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>

                                <CityHolder>
                                    <Input type="text" placeholder="City / Town" value={city} onChange={(e) => setCity(e.target.value)}/>
                                    <Input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
                                </CityHolder>

                                <Input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                                <Input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)}/>

                                <Button block black type='submit' >Continue to Payment</Button>
                            </form>
                        </Box>
                    )}
                    
                </ColumnsWrapper>
            </Center>
            
        </>
    )
}