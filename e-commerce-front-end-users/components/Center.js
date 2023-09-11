import { styled } from "styled-components"

const StyledDiv = styled.div`
    max-width: 920px;
    margin: 0 auto;
    padding: 0 20px;
`

export default function CenterNav({children}) {
    return (
        <StyledDiv>{children}</StyledDiv>
    )
}