
import styled from "styled-components";
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import abi from './abi/maercs.json'
import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'
import { useEffect, useState } from "react";

import logo from "./logo.png"

const injected = new InjectedConnector({ supportedChainIds: [4002, 250] })
const StyledDiv = styled.div`
background: black;
border-radius: 10px;
height: 50px;
border-color: cyan;
border-width: medium;
padding: 10px;
margin: 10px;
border-style: solid;
box-shadow: 0 0 20px cyan;
`

const StyledButton = styled.button`
background: transparent;
float: right;
color: cyan;
border: cyan;
border-radius: 100px;
border-width: medium;
border-color: cyan;
width: 100px;
border-style: solid;
height: 50px;
box-shadow: 0 0 20px cyan;
&:hover {
    background: cyan;
    color: black;
}
`

const StyledTitle = styled.div`
float: left;
font-size: 40px;
color: cyan;
`

const StyledBalance = styled.div`
float: left;
font-size: 20px;
color: cyan;
    margin-top: inherit;
`

const StyledImg = styled.img`
height:100%;
float: left;
`

function getTokenContract(address, abi, library) {
    return new Contract(address, abi, library)
}

function getBalance(contract, user) {
    return contract.balanceOf(user).then(rst => {
        return rst
    }).catch(e => console.log)
}

function NavBar(props) {
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React()

    const [wooBalance, setWooBalance] = useState(0)

    useEffect(() => {
        const contract = getTokenContract(props.address, abi, library ? library.getSigner(account).connectUnchecked() : library)
        getBalance(contract, account).then(rst => {
            setWooBalance(rst)
        })
    }, [account])

    return (
        <StyledDiv>
            <StyledImg src={logo}></StyledImg>
            <StyledButton onClick={() => { account ? deactivate() : activate(injected) }}>{
                account ? account.slice(0, 6) + "..." : "Connect"
            }</StyledButton>
            {wooBalance ? <StyledBalance>
                {"$Woo balance: " + formatEther(wooBalance.toString())}
            </StyledBalance> : ""}
        </StyledDiv>
    )
}

export default NavBar