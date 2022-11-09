import React, {useEffect, useState} from "react"
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { address, abi, abi2, abi3 } from "./constants";

export const Context = React.createContext()

const fetchContract = (signer) => {
  return new ethers.Contract(address, abi3, signer)
}

export const ContextProvider = ({children}) => {
    const [isConnected, setisConnected] = useState(false);
    const [signer, setsigner] = useState(undefined);
    const [walletAddress, setwalletAddress] = useState("");
    const [retrieve, setretrieve] = useState("s")

    const router = useRouter()

    const checkIfWalletIsConnected = async () => {
        if(!window.ethereum){
            return toast.error("Metamask is not installed")
        }
        const accounts = await window.ethereum.request({method: "eth_accounts"})
        if(accounts.length) {
            setwalletAddress(accounts[0])
            setisConnected(true)
        }else{
            setisConnected(false)
            toast.warn("Please connect your wallet")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
        interact()
    }, [])

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
          const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
          setwalletAddress(accounts[0])
          setisConnected(true)
        } else {
          setisConnected(false);
        }
    }

    const interact = async () => {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const val = await contract.retrieve()
      console.log(val.toString())
      setretrieve(val.toString())
    }

    const sendTran = async () => {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      await contract.increment()
    }

    const setTransaction = async (args) => {
      console.log(args)
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      await contract.setValue(args)
    }

    const signTransactionwithout721 = (args) => {
      setTransaction(args)
    }

    const signTransaction = async (args) => {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const signAdd = await signer.getAddress()

      const domain = {
        name: "My App",
        version: "1",
        chainId: 1337,
        verifyingContract: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      };
      const types = {
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person" },
          { name: "content", type: "string" },
        ],
        Person: [
          { name: "wallet", type: "address" },
        ],
      };
      const mail = {
        from: {
          wallet: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
        },
        to: {
          wallet: signAdd,
        },
        content: `setting value to ${args}`,
      };

      const signature = await signer._signTypedData(domain, types, mail);
      console.log(signature)
      const expectedSignerAddress = await signer.getAddress();
      console.log(expectedSignerAddress)
      const recoveredAddress = ethers.utils.verifyTypedData(
        domain,
        types,
        mail,
        signature
      );
      if (recoveredAddress === expectedSignerAddress){
        setTransaction(args)
      };
      
  }


    return (
      <Context.Provider
        value={{
          connectWallet,
          signer,
          isConnected,
          walletAddress,
          retrieve,
          sendTran,
          setTransaction,
          signTransaction,
        }}
      >
        {children}
        <ToastContainer />
      </Context.Provider>
    );
}