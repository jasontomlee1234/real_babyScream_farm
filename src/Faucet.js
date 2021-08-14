import abi from './abi/maercs.json'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from "react";
import { Contract } from '@ethersproject/contracts'
import { parseEther } from '@ethersproject/units'


function getTokenContract(address, abi, library) {
    return new Contract(address, abi, library)
}

function faucet(contract, user, amount) {
    contract.mint(user, parseEther(amount))
}

function Faucet(props){
    const { library, account } = useWeb3React()
    const [contract, setContract] = useState()
    const [faucetAmount, setfaucetAmount] = useState(0)

    function handleFaucetChange(event) {
        setfaucetAmount(event.target.value)
    }

    useEffect(() => {
        const contract = getTokenContract(props.address, abi, library ? library.getSigner(account).connectUnchecked() : library)
        setContract(contract)
    }, [account])


    return(
        <div>
            <input type="number" onChange={handleFaucetChange}></input>
            <button onClick={()=>{
                faucet(contract, account, faucetAmount)
            }}>Get Test LP</button>
        </div>
    )
}

export default Faucet