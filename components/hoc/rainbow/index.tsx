// import '@rainbow-me/rainbowkit/styles.css';
// import {
//   getDefaultWallets,
//   RainbowKitProvider,
// } from '@rainbow-me/rainbowkit';
// import { configureChains, createConfig, WagmiConfig } from 'wagmi';
// import {
//   mainnet,
//   polygon,
//   optimism,
//   arbitrum,
//   zora,
// } from 'wagmi/chains';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
// import { publicProvider } from 'wagmi/providers/public';

// const { chains, publicClient } = configureChains(
//   [mainnet, polygon, optimism, arbitrum, zora],
//   [
//     alchemyProvider({ apiKey: '' }), // process.env.ALCHEMY_ID
//     publicProvider()
//   ]
// );
// const { connectors } = getDefaultWallets({
//   appName: 'ChatXBT',
//   projectId: 'PROJECT_ID',
//   chains
// });
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient
// })

// const RainBow = ({children}: any) => {
//     return (
//     <WagmiConfig config={wagmiConfig}>
//       <RainbowKitProvider chains={chains}>
//         {children}
//       </RainbowKitProvider>
//     </WagmiConfig>
//     );
// };

// export default RainBow;
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  coinbaseWallet,
  ledgerWallet,
  trustWallet
} from '@rainbow-me/rainbowkit/wallets';
// import { MetaMaskConnector } from "@wagmi/connectors/metaMask";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    alchemyProvider({ apiKey: 'e9w03gynFBVJdeZv_yjvhZHgsUJthowe' }),
    publicProvider()
  ]
);
// const { connectors } = getDefaultWallets({
//   appName: 'ChatXBT',
//   // @ts-ignore
//   projectId: '954d1cd106b485e394a1b5b7423a42bd',
//   chains
// });

// "wagmi": "0.12.8","@rainbow-me/rainbowkit": "0.12.5",
const connectors = connectorsForWallets([
  {
      groupName: 'Recommended',
      wallets: [
          injectedWallet({ chains, shimDisconnect: true }),
          metaMaskWallet({ chains, shimDisconnect: true, projectId: '954d1cd106b485e394a1b5b7423a42bd'  }),
          coinbaseWallet({ chains, appName: 'Linagee Identity' }),
          ledgerWallet({ chains, projectId: '954d1cd106b485e394a1b5b7423a42bd' }),
          rainbowWallet({ chains, shimDisconnect: true, projectId: '954d1cd106b485e394a1b5b7423a42bd' }),
          walletConnectWallet({ chains, projectId: '954d1cd106b485e394a1b5b7423a42bd' }),
      ],
  },
  {
      groupName: 'Other',
      wallets: [
          trustWallet({ chains, shimDisconnect: true, projectId: '954d1cd106b485e394a1b5b7423a42bd' }),
      ]
  }
]);
const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  // webSocketPublicClient
})

const RainBow = ({children}: any) => {
    return (
      <WagmiConfig config={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    );
};

export default RainBow;