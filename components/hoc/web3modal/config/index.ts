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

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [mainnet, sepolia, goerli], // required
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

