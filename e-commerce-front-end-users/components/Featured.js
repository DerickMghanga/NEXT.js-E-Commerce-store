import { styled } from "styled-components";
import Center from "./Center";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
`
const Desc = styled.p`
    color: #aaa;
`

export default function Featured() {
    return (
        <Bg>
            <Center>
                <Title>Pro anywhere</Title>
                <Desc>
                    Nunc sed turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Phasellus dolor. Vestibulum ullamcorper mauris at ligula.
                    Etiam rhoncus. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.Vestibulum ullamcorper mauris at ligula.
                    Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros.
                </Desc>
            </Center>
            
        </Bg>
    )
}