import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    margin-top: 30px;
`
const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 25px;
`
export default function CartPage() {
    return (
        <>
            <Header />

            <Center>
                <ColumnsWrapper>
                    <Box>1</Box>
                    <Box>
                        <h3>Order Information</h3>
                        <Button block primary >Continue to Payment</Button>
                    </Box>
                </ColumnsWrapper>
            </Center>
            
        </>
    )
}