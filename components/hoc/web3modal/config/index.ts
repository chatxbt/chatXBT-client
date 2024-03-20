// "use client";

// import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

// import { WagmiConfig } from 'wagmi'
// import { arbitrum, mainnet, goerli } from 'viem/chains'

// // 1. Get projectId
// const projectId = '954d1cd106b485e394a1b5b7423a42bd'

// // 2. Create wagmiConfig
// const metadata = {
//   name: 'ChatXBT',
//   description: 'ChatXBT',
//   url: 'https://dev.chatxbt.com',
//   icons: ['https://www.chatxbt.com/images/logo/logo-2.png']
// }

// const chains = [mainnet, arbitrum, goerli]
// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// // 3. Create modal
// createWeb3Modal({ 
//     wagmiConfig, 
//     // includeWalletIds:[], 
    
//     // excludeWalletIds={"ALL"},
//     projectId, 
//     chains, 
//     themeMode:'dark',
//     // themeVariables: {
//     //     '--w3m-color-mix': '#00BB7F',
//     //     '--w3m-color-mix-strength': 40
//     // }
// })

// export function Web3Modal({ children }: any) {
//   return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
// }

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia, goerli } from 'wagmi/chains'
import { defineChain } from 'viem'

// Get projectId at https://cloud.walletconnect.com
// export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '954d1cd106b485e394a1b5b7423a42bd'
export const projectId = '954d1cd106b485e394a1b5b7423a42bd'

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'ChatXBT',
  description: 'ChatXBT',
  url: 'https://dev.chatxbt.com',
  icons: ['https://www.chatxbt.com/images/logo/logo-2.png']
}

export const chatxbtchain = defineChain({
  id: 15779,
  name: 'chatxbt',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.buildbear.io/zany-gilgamesh-cf3ecd70'] },
  },
  blockExplorers: {
    default: { name: 'chatxbt', url: 'https://explorer.buildbear.io/zany-gilgamesh-cf3ecd70' },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    ensUniversalResolver: {
      address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
      blockCreated: 16773775,
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14353601,
    },
  },
})

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [mainnet, sepolia, goerli, chatxbtchain], // required
  projectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
  enableEmail: true // Optional - false by default
  // ...wagmiOptions // Optional - Override createConfig parameters
})

