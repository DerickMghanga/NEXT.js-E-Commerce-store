import { styled } from "styled-components"
import Center from "./Center"
import ProductBox from "./ProductBox"


const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    padding-top: 10px;

`
const Title = styled.h2`
    font-size: 2rem;
    margin: 12px 0;
`

export default function NewProducts({products}) {
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductGrid>
                {products.length > 0 && products.map(product => (
                    <ProductBox {...product}/>  //allows to grab each product props seperately in the ProductBox component
                ))}
            </ProductGrid>
        </Center>
    )
}