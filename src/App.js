import './App.css';
import NavBar from './NavBar'
import FarmCard from './FarmCard'
import Faucet from './Faucet'
import Footer from './Footer';
import { useWeb3React } from '@web3-react/core'
import styled, { keyframes } from "styled-components";

const StyledBody = styled.div`
  display: flex;
  width: 70%;
  margin: auto;
  flex-wrap: wrap;
`

function App() {
  const { account, chainId } = useWeb3React()
  console.log(`
  MMMMMMMMMMMMMMMWWNNXKKK00000KKXNNWMMMMMMMMMMMMMMMM
  MMMMMMMMMMMMWNKOkolc:;;,,,,;;;:coxOKXWWMMMMMMMMMMM
  MMMMMMMMMWX0xl:,'.................,;lx0XWMMMMMMMMM
  MMMMMMMNKkl;'..... ...''''''..........;lxKNWMMMMMM
  MMMMMWKkl,....    ..,'......','.     ...'cxKNMMMMM
  MMMWNOo;...      .,'.        .',..     ...,lkXWMMM
  MMWXkc'..       .,'            .,.       ...:xKWMM
  MWXkc...       .,,. .',.. .,'.  ',.       ...:xKWM
  MNOc'..       ..;. .,;;'...;;,. .,'.       ...:kXW
  W0o,..      .'',,'',,;,. ..';,,'',,''..     ..'l0N
  NOc...     .,..,,'.','..''..',,'.';..,'.     ..:kX
  Xx:..      ';..,''''..'::::,..'''','.,,.    ...;dK
  Xx;..      ..'''.    .,;,,;;.   ..','..      ..,dK
  Xk:..         .',.   ........   .,,.         ..;xK
  NOl'..          .,. ...',,'.....,'.          ..ckX
  WKd;..           ',.''.;;;;'.'',,.          ..,o0W
  MNOo,..          .,,;:,,,''',:;;.          ..'lONM
  MWNOl'..          .,,:;,'',;:;;,.         ...ckXWM
  MMMNOo,..         .,'.''''''.',.         ..'lkXWMM
  MMMMN0d:...        .;........,'.       ...;o0NMMMM
  MMMMMWXOo:'...     .';'.....,'.     ....;lkXWMMMMM
  MMMMMMMWX0dc;'........,,''',.........,cdOXWMMMMMMM
  MMMMMMMMMWNKOxl:,'..............',:cdOKNWMMMMMMMMM
  MMMMMMMMMMMMMWXK0kxolcc::::cclodkOKXNWMMMMMMMMMMMM
  MMMMMMMMMMMMMMMMMWNXKKK00000KKXNWMMMMMMMMMMMMMMMMM `)
  return (
    <div>
      <div>
        <NavBar address={"0xf4c294402c02cdc2e0668dd38f6750ebed72f4f1"} />
        <StyledBody>
          <FarmCard pairName={"BabyScream / Scream SPK LP 1X"} address={"0x40fb2353AbDF2A923351997f0411C1681dDEA1f0"} pid={0} lpUrl={"https://spookyswap.finance/add/0xb508A36a19251b2AC07b33EB7e5505eE46B0C5eB/0xe0654C8e6fd4D733349ac7E09f6f23DA256bF475"}/>
          <FarmCard pairName={"Woo/FTM ZOODEX LP 2X"} address={"0x40fb2353AbDF2A923351997f0411C1681dDEA1f0"} pid={1} lpUrl={"https://dex.zoocoin.cash/pool/add?inputCurrency=0xf4C294402C02CdC2e0668dD38F6750EBEd72F4F1&outputCurrency=FTM"}/>
          {account && chainId == 4002 ? <Faucet address={"0x241a71dc9e73dbfc7ceddaddd3017adfb299fdfe"} /> : ""}
        </StyledBody>
        <Footer />
      </div>
    </div>
  )
}

export default App