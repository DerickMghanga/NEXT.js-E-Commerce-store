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
    grid-template-columns: 1fr;
    gap: 40px;
    margin: 30px 0;

    @media screen and (min-width: 768px) {
        grid-template-columns: 1.3fr .7fr;
    }
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
    padding: 2px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;

    img{
        max-width: 66px;
        max-height: 66px;   
    }

    @media screen and (min-width: 768px) {
        padding: 10px;

        img{
            max-width: 80px;
            max-height: 80px;   
        }
    }
`
const QuantityLabel = styled.span`
    padding: 0 5px;
    margin: 5px;
    display: block;

    @media screen and (min-width: 768px) {
        display: inline-block;
    }
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

    const [isSuccess, setIsSuccess] = useState(false);  //check if payment was succesfull

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

    //clear Cart after Successfully making an Order
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, [cartProducts]);

    // add more product button
    function moreOfThisProduct(id) {
        addProduct(id);
    }

    // remove product
    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name, email, city, postalCode, streetAddress,
            phoneNumber, country,
            cartProducts,
        });

        if (response.data.url) {  //grab url from response and navigate to it
            window.location = response.data.url;
        }
    }

    let total = 0;
    for (const productId of cartProducts) {  
        const price = products.find(p => p._id === productId)?.price || 0; //find price for the products
        total += price;
    }

    // check if the payment was successfull from the link >>> /api/checkout.js 
    if(isSuccess) {
        return(
            <>
                <Header />
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Thanks for your Order!❤️</h1>
                            <p>We will Contact you soon😍</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        )
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
                                                $ {product.price * cartProducts.filter((id) => id === product._id).length}
                                            </td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td></td>

                                        <td>
                                        <Button primary red onClick={() => {clearCart()}}>Clear Cart!</Button>
                                        </td>
                                        
                                        <td>${total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}

                    </Box>

                    {/* This Box appears ONLY if we have items in the Cart */}
                    {!!cartProducts?.length && (   // converts to boolean using '!!'
                        <Box>
                            <h3>Order Information</h3>

                            <Input type="text" placeholder="Full Name" name="name"
                                value={name} onChange={(e) => setName(e.target.value)}/>

                            <Input type="text" placeholder="Email Address" name="email"
                                value={email} onChange={(e) => setEmail(e.target.value)}/>

                            <Input type="text" placeholder="Street / Home Address" name="streetAddress"
                                value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>

                            <CityHolder>
                                <Input type="text" placeholder="City / Town" name="city"
                                    value={city} onChange={(e) => setCity(e.target.value)}/>

                                <Input type="text" placeholder="Postal Code" name="postalCode"
                                    value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>

                            </CityHolder>

                            <Input type="text" placeholder="Phone Number" name="phoneNumber"
                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>

                            <Input type="text" placeholder="Country" name="country"
                                value={country} onChange={(e) => setCountry(e.target.value)}/>

                            <Button block black onClick={goToPayment} >Continue to Payment</Button>
                            
                        </Box>
                    )}
                    
                </ColumnsWrapper>
            </Center>
            
        </>
    )
}