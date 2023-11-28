"use client";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'

// 1. Get projectId
const projectId = '954d1cd106b485e394a1b5b7423a42bd'

// 2. Create wagmiConfig
const metadata = {
  name: 'ChatXBT',
  description: 'ChatXBT',
  url: 'https://dev.chatxbt.com',
  icons: ['https://www.chatxbt.com/images/logo/logo-2.png']
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ 
    wagmiConfig, 
    // includeWalletIds:[], 
    
    // excludeWalletIds={"ALL"},
    projectId, 
    chains, 
    themeMode:'dark',
    // themeVariables: {
    //     '--w3m-color-mix': '#00BB7F',
    //     '--w3m-color-mix-strength': 40
    // }
})

export function Web3Modal({ children }: any) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}