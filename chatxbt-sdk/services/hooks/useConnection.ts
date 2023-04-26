import { randomBytes } from 'crypto'
import { useCallback, useMemo } from "react";
import { ethers } from 'ethers'
import { connectionStore } from "@chatxbt-sdk/store/zustand";


declare global {
  interface Window {
    ethereum: any;
  }
}

const getSigner = async (provider: any, account: string) => {
  const signer = provider.getSigner(account);
  const signature = await window.ethereum.request({
    method: 'personal_sign',
    params: [
      `
Verify Your Address ${account} 
Request Key: ${randomBytes(16).toString('hex')}
`,
      account,
    ],
  });

  return { signer, signature, address: ethers.utils.getAddress(account) };
}

export const useConnection = () => {
  const { connect } = connectionStore.useConnectionStore((store: any) => store);
  const ethereum = useMemo(() => window.ethereum, []);
  const connectMetamask = useCallback(async () => {
    if (!ethereum) return { signer: null }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const { signature, address } = await getSigner(provider, accounts[0]);
    connect(address, signature, 'metamask');
    window.ethereum.on('accountsChanged', async (accounts: string[]) => {
      if (accounts.length > 0) {
        const { signature, address, signer } = await getSigner(provider, accounts[0])
        connect(address, signature, 'metamask');
      }
    });
    window.ethereum.on('chainChanged', async (_chainId: any) => {
      window.location.reload(); // As recommended by metamask doc
    });
  }, [connect, ethereum]);
  return { connectMetamask }
}