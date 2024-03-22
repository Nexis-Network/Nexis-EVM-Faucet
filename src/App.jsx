import { useState } from 'react';
import "./App.css"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Button, Heading,Input,Text } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const toast = useToast();
  const [inputAddress,setInputAddress] = useState('');
  const FAUCET_ENDPOINT ="https://nexis-sandy.vercel.app/faucet";
  // const FAUCET_ENDPOINT ="http://localhost:8080/faucet";

  const addNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x942',
          chainName: 'Nexis Network Testnet',
          nativeCurrency: {
            name: 'Nexis',
            symbol: 'NZT',
            decimals: 18,
          },
          rpcUrls: ['https://evm-testnet.nexis.network'],
          blockExplorerUrls: ['https://evm-testnet.nexscan.io/'], 
        }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async()=>{
    if(inputAddress.length!=42){
      toast({
        title: "Invalid Address",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }else{
      const {data} = await axios.post(FAUCET_ENDPOINT,{address:inputAddress})
      console.log(data)
      if(data.sent){
        toast({
          title: "Sent tokens successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }else{
        toast({
          title: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <div className='app-container'>
      <Navbar/>
        <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '70vh' }} className='glassmorph'>
        <Heading as='h2' size='xl' style={{ borderBottom: '2px solid #ccc' }}>
          
        Nexis <span style={{ backgroundColor: 'black',color:'white',padding:'2px' }}>Faucet</span>
      </Heading>
      <div style={{margin:'20px',maxWidth:'60%'}}>

      <Text fontSize='lg' fontWeight='bold'>
          NOTE: We only send testnet NZT , which has no financial significance.
          </Text>
         
          </div>
          <Input placeholder='Paste Address' size='lg' width={"65vw"} value={inputAddress} onChange={e=>setInputAddress(e.target.value)}/>
          <br />
          <Button className='card__cta cta' onClick={handleClick}>Receive 10 Test NZT</Button>
        </div>

      <Footer addNetwork={addNetwork} />
    </div>
  );
}

export default App;
