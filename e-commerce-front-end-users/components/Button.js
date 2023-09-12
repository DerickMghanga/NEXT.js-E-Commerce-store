import { primary } from "@/lib/colors"
import { css, styled } from "styled-components"

export const ButtonStyle = css`   //to be used by both Button & ButtonLink components
    border: 0;
    padding: 4px 12px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    font-weight: bold;

    svg{
        height: 17px;
        margin-right: 5px;
    }

    ${props => props.block && css`
        display: block;
        width: 100%;
    `}

    ${props => props.white && !props.outline && css`
        background-color: #fff;
        color: #000;
        margin: 3px;
    `}

    ${props => props.white && props.outline && css`
        background-color: transparent;
        color: #fff;
        margin: 3px;
        border: 1px solid #fff;
    `}

    ${props => props.black && !props.outline && css`
        background-color: #000;
        color: #fff;
        margin: 3px;
    `}

    ${props => props.black && props.outline && css`
        background-color: transparent;
        color: #000;
        margin: 3px;
        border: 1px solid #000;
    `}

    ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    color: #fff;
    border: 2px solid ${primary};
    margin: 3px;
    `}

    ${props => props.primary && props.outline && css`
    background-color: transparent;
    color: ${primary};
    border: 2px solid ${primary};
    margin: 3px;
    `}

    ${props => props.size === 'l' && css`
        font-size: 1.2rem;
        padding: 6px 15px;
        svg{
            height: 20px;
        }
    `}
`

const StyledButton = styled.button`
    ${ButtonStyle}
`

export default function Button({children, ...rest}) {
    return (
        <StyledButton {...rest} >{children}</StyledButton>
    )
}