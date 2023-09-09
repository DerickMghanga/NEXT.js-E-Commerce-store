import { styled } from "styled-components"
import Center from "./Center"
import ProductBox from "./ProductBox"


const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    padding-top: 20px;

`

export default function NewProducts({products}) {
    return (
        <Center>
            <ProductGrid>
                {products.length > 0 && products.map(product => (
                    <ProductBox {...product}/>  //allows to grab each product props seperately in the ProductBox component
                ))}
            </ProductGrid>
        </Center>
    )
}