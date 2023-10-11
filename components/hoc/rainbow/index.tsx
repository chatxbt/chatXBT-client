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
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    alchemyProvider({ apiKey: '' }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'ChatXBT',
  // @ts-ignore
  projectId: 'PROJECT_ID',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const RainBow = ({children}: any) => {
    return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    );
};

export default RainBow;