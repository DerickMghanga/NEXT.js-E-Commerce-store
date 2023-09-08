import Link from "next/link"
import { styled } from "styled-components"
import { ButtonStyle } from "./Button" //styles imported from Button component

const StyledLink = styled(Link)` 
    ${ButtonStyle}
`

export default function ButtonLink(props) {
    return(
        <StyledLink {...props} />
    )
}