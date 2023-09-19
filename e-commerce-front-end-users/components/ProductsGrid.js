import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding-top: 10px;
    margin-bottom: 25px;

    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`

export default function ProductsGrid({products}) {
    return(
        <StyledProductsGrid>
             {products.length > 0 && products.map(product => (
                    <ProductBox key={product._id} {...product}/> //allows to grab each product props seperately in the ProductBox component
                ))}
        </StyledProductsGrid>
    )
}