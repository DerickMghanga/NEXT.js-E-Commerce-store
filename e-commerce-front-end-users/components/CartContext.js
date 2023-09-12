import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    const [cartProducts, setCartproducts] = useState([]);

    //store cart context to local storage after 'cart.js' page mounts
    useEffect(()=> {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]);

    // fetch cart context from local storage after 'cart.js' page mounts
    useEffect(()=> {
        if (ls && ls.getItem('cart')) {
            setCartproducts(JSON.parse(ls.getItem('cart')));
        }
    }, [])

    // Add new product to the previously saved products in the cart
    function addProduct(productId) {    // productId = product._id
        setCartproducts(prev => [...prev, productId]);
    }

    // Remove product from previously saved products in the cart
    function removeProduct(productId) {
        setCartproducts(prev => {
            const pos = prev.indexOf(productId); //find the position of the product in 'cartProducts' array

            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        });
    }

    function clearCart() {
        setCartproducts([]);
    }

    return (
        <CartContext.Provider value={{cartProducts, setCartproducts, addProduct, removeProduct, clearCart}} >
            {children}
        </CartContext.Provider>
    );
}