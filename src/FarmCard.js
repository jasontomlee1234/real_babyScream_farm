import abi from "./abi/masterchef.json"
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from '@ethersproject/units'
import tokenAbi from './abi/maercs.json'

import {useInterval} from './useInterval'

const glow = keyframes`
  0% {
    box-shadow: 0 0 20px cyan;
  }

  50% {
    box-shadow: 0 0 50px cyan;
  }

  100% {
    box-shadow: 0 0 20px cyan;
  }
`;


const StyledCard = styled.div`
border-radius: 10px;
height: 300px;
border-color: cyan;
border-width: medium;
width: 300px;
border-style: solid;
color: cyan;
margin:auto;
padding: 30px;
animation: ${glow} 1s linear infinite;
margin-top: 100px;
height: auto;
div:{
    padding: 20px;
    margin: 20px;
}
`

const StyledInput = styled.input`
background: transparent;
    border: solid;
    color: cyan;
    height: 30px;
    width: 60%;
    border-radius: 10px;
    border-width: medium;
box-shadow: 0 0 10px cyan;

&:focus{
    outline: none;
border-style: solid;
border-color: cyan;
border-radius: 10px;
box-shadow: 0 0 20px cyan;
}
`

const StyledButton = styled.button`
background: transparent;
flow: right;
color: cyan;
border: cyan;
border-radius: 100px;
border-width: medium;
border-color: cyan;
border-style: solid;
height: 30px;
box-shadow: 0 0 20px cyan;
width: 100px;    
&:hover {
    background: cyan;
    color: black;
}
`

const StyledRow = styled.div`
display: flex
justify-content: space-between;
`
const StyledSpacedRow = styled.div`
margin-bottom: 20px;
`

function getContract(address, abi, library) {
    return new Contract(address, abi, library)
}

function getUserInfo(contract, user) {
    return contract.userInfo(0, user).then(rst => {
        return rst
    }).catch(e => console.log)
}

function getPoolInfo(contract, pid) {
    return contract.poolInfo(pid).then(rst => {
        return rst
    }).catch(e => console.log)
}

function getPendingReward(contract, user) {
    return contract.pendingwoo(0, user).then(rst => {
        return rst
    }).catch(e => console.log)
}

function getAllowance(contract, owner, spender) {
    return contract.allowance(owner, spender).then(rst => {
        return rst
    }).catch(e => console.log)
}

function getBalance(contract, user) {
    return contract.balanceOf(user).then(rst => {
        return rst
    }).catch(e => console.log)
}

function approve(contract, spender) {
    contract.approve(spender, parseEther("99999999999999999999999999999"))
}

function withdraw(contract, pid, amount) {
    contract.withdraw(pid.toString(), parseEther(amount)).then(rs => {
        rs.wait().then(e => {
            console.log(e)
        })
    })
}

function deposit(contract, pid, amount) {
    contract.deposit(pid.toString(), parseEther(amount))
}

function isAllowed(amount) {
    return amount==0 ? false : true
}


function FarmCard(props) {
    const { library, account } = useWeb3React()
    const [staked, setStaked] = useState()
    const [pendingReward, SetPendingReward] = useState()
    const [contract, setContract] = useState()
    const [lpContract, setLpContract] = useState()
    const [lpBalance, setLpBalance] = useState(0)
    const [depositAmount, setDepositAmount] = useState(0)
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const [allowance, setAllowance] = useState(0)

    function handleDepositChange(event) {
        setDepositAmount(event.target.value)
    }

    function handleWithdrawChange(event) {
        setWithdrawAmount(event.target.value)
    }

    useInterval(async()=>{
        const _contract = getContract(props.address, abi, library ? library.getSigner(account).connectUnchecked() : library)
        setContract(_contract)
        const _pendingReward = await getPendingReward(_contract, account)
        SetPendingReward(_pendingReward)

        const _userInfo = await getUserInfo(_contract, account)
        setStaked(_userInfo['amount'])

        const _poolInfo = await getPoolInfo(_contract, props.pid)
        if (_poolInfo.length > 0) {
            const lp = getContract(_poolInfo.lpToken, tokenAbi, library ? library.getSigner(account).connectUnchecked() : library)
            setLpContract(lp)
            const _balance = await getBalance(lp, account)
            setLpBalance(_balance)

            const _allowance = await getAllowance(lp, account, _contract.address)
            setAllowance(_allowance)
        }
    },1000)

    // useEffect(async () => {
    //     const _contract = getContract(props.address, abi, library ? library.getSigner(account).connectUnchecked() : library)
    //     setContract(_contract)
    //     const _pendingReward = await getPendingReward(_contract, account)
    //     SetPendingReward(_pendingReward)

    //     const _userInfo = await getUserInfo(_contract, account)
    //     setStaked(_userInfo['amount'])

    //     const _poolInfo = await getPoolInfo(_contract, props.pid)
    //     if (_poolInfo.length > 0) {
    //         const lp = getContract(_poolInfo.lpToken, tokenAbi, library ? library.getSigner(account).connectUnchecked() : library)
    //         setLpContract(lp)
    //         const _balance = await getBalance(lp, account)
    //         setLpBalance(_balance)

    //         const _allowance = await getAllowance(lp, account, _contract.address)
    //         setAllowance(_allowance)
    //     }

    // }, [account])


    return (
        <StyledCard>
            <StyledSpacedRow>
                <div>

                {props.pairName}
                </div>
                <div>
                <a href={props.lpUrl} target="_blank"> ADD lP </a>
                </div>
                </StyledSpacedRow>
            <StyledSpacedRow>
            <div>deposit: {staked ? formatEther(staked.toString()) : 0}</div>
            <StyledRow>
                <div>earned: {pendingReward ? formatEther(pendingReward.toString()) : 0}</div>
                <div>
                    <StyledButton onClick={() => {
                        withdraw(contract, props.pid, '0')
                    }} disabled={account ? false : true}>harvest</StyledButton>
                </div>
            </StyledRow>
            </StyledSpacedRow>
            <StyledSpacedRow>
            <div>
                <div>Deposit: </div>
                <div>balance: {account ? formatEther(lpBalance.toString()) : 0}</div>
                <StyledRow>
                    <div>
                        <StyledInput disabled={account ? false : true} type="number" value={depositAmount} onChange={handleDepositChange}></StyledInput>
                        {
                            isAllowed(allowance) ? <StyledButton onClick={() => {
                                deposit(contract, props.pid, depositAmount)
                            }} disabled={account ? false : true}>Deposit</StyledButton> :
                                <StyledButton onClick={() => {
                                    approve(lpContract, contract.address)
                                }} disabled={account ? false : true}>Approve</StyledButton>
                        }
                    </div>
                </StyledRow>

            </div>
            </StyledSpacedRow>
            <div>Withdraw: </div>
            <StyledRow>
                <StyledInput disabled={account ? false : true} type="number" value={withdrawAmount} onChange={handleWithdrawChange}></StyledInput>
                <StyledButton onClick={() => {
                    withdraw(contract, props.pid, withdrawAmount)
                }} disabled={account ? false : true}>Withdraw</StyledButton>
            </StyledRow>
        </StyledCard>
    )
}

export default FarmCard