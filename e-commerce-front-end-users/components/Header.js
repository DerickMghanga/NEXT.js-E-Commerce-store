import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";   //center div component
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import MenuBars from "./icons/MenuBars";

const StyledHeader = styled.header`
    background-color: #222;
`
const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    position: relative;
    z-index: 5;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px 0;
`
const StyledNav = styled.nav`
    ${props => props.mobileNavActive ? `
        display: block;`
        : `
        display: none;
        `}

    gap: 15px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 70px 20px;
    background-color: #222;

    @media screen and (min-width: 768px) {
        display: flex;
        position: static;
        padding: 0;
    }
`
const NavLink = styled(Link)`
    display: block;
    color: #aaa;
    text-decoration: none;
    padding: 10px 0;

    @media screen and (min-width: 768px) {
        padding: 0;
    }
`
const NavButton = styled.button`
    background-color: transparent;
    width: 35px;
    height: 35px;
    border: 0;
    color: #fff;
    cursor: pointer;
    position: relative;
    z-index: 5;

    @media screen and (min-width: 768px) {
        display: none;
    }
`

export default function Header() {
    
    const [mobileNavActive, setMobileNavActive] = useState(false);
    const {cartProducts} = useContext(CartContext);  //from CartContext.Provider


    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Ecommerce</Logo>

                    <StyledNav mobileNavActive={mobileNavActive}>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All Products</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                    </StyledNav>

                    <NavButton onClick={()=>setMobileNavActive(!mobileNavActive)}>
                        <MenuBars />
                    </NavButton>
                </Wrapper>
            </Center>
            

        </StyledHeader>
    )
}