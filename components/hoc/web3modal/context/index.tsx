'use client'

import React, { ReactNode } from 'react'
import { config, projectId } from '../config'
import { siweConfig } from '../siwe'

import { createWeb3Modal } from '@web3modal/wagmi/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { State, WagmiProvider } from 'wagmi'

import { goerli } from 'wagmi/chains'



// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
  defaultChain: goerli,
  // siweConfig,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  termsConditionsUrl: 'https://www.mytermsandconditions.com',
  privacyPolicyUrl: 'https://www.myprivacypolicy.com',
  allWallets: 'ONLY_MOBILE', // SHOW HIDE,
  themeMode: 'dark',
  enableOnramp: true,
})

export function ContextProvider({
  children,
  initialState
}:{
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider 
      config={config} 
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

