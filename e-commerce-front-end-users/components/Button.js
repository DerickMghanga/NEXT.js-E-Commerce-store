import { css, styled } from "styled-components"

export const ButtonStyle = css`   //to be used by both Button & ButtonLink components
    border: 0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;

    svg{
        height: 17px;
        margin-right: 5px;
    }

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

    ${props => props.primary && css`
    background-color: #0052cc;
    color: #fff;
    border: 1px solid #0052cc;
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