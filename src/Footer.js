import styled, { keyframes } from "styled-components";
import neonFooter from './neon-footer.png';

const StyledDiv = styled.div`
    padding: 100px;
    font-size: 30px;
    text-align: center;

`

function Footer() {
    return (
        <StyledDiv>
            <div>
                $Woo/block: 0.01
            </div>
            <br/>
            <div>
                This project is in a super-duper early experimental stage. Using smart contract is always a risk. DYOR and use this at your own risk.
            </div>
        </StyledDiv>
    )
}

export default Footer