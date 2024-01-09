import { Web3Auth } from "@web3auth/modal";

export const Web3WebWalletButton = () => {
    //Authenticate users on click 

const web3auth = new Web3Auth({
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID as string, 
        chainConfig: {
        chainNamespace: "eip155",
        chainId: "0x1", //ID of the chain you are attempting to connect to 
        },
    });
    
    async function login(){
        await web3auth.initModal();
        await web3auth.connect();
    }
    return (
        <>
        <button onClick={() => login()} value="Login">connect</button>
        </>
    )
}