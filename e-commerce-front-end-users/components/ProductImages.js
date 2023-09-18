import { useState } from "react"
import { styled } from "styled-components"

const BigImage = styled.img`
    max-width: 100%;
    max-height: 100%;
`
const BigImageWrapper = styled.div`
    text-align: center;
`
const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`
const ImageButtons = styled.div`   //All images button
    display: flex;
    gap: 10px;
    margin-top: 10px;
`
const ImageButton = styled.div`   // Single image
    border: 1px solid #ccc;
    height: 75px;
    padding: 3px;
    cursor: pointer;
    border-radius: 10px;
`


export default function ProductImages({images}) {  // array of images

    const [activeImage, setActiveImage] = useState(images?.[0]);

    return (
        <>
            <BigImageWrapper>
                <BigImage src={activeImage}/> 
            </BigImageWrapper> 

            {/* Buttons to change Main Image display */}
            <ImageButtons>
                {images.map(image => (
                    <ImageButton onClick={() => setActiveImage(image)}>
                        <Image src={image}/>
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}