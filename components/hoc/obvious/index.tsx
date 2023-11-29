// import {
//     ObviousConfig,
//     WalletButton,
//     getConnectors,
//   } from "@itsobvioustech/embed";
//   import {
//     arbitrum,
//     avalanche,
//     base,
//     bsc,
//     mainnet,
//     optimism,
//     polygon,
//     polygonZkEvm,
//   } from "viem/chains";
//   import { WagmiConfig, configureChains, createConfig, useAccount } from "wagmi";
//   import { publicProvider } from "wagmi/providers/public";
   
//   const { chains, publicClient } = configureChains(
//     [mainnet, polygon, arbitrum, avalanche, optimism, base, polygonZkEvm, bsc],
//     [publicProvider()]
//   );
   
//   const wagmiConfig = createConfig({
//     autoConnect: true,
//     connectors: getConnectors({
//       chains,
//       metadata: {
//         name: "ChatXBT",
//         description: "ChatXBT",
//         url: "https://dev.chatxbt.com",
//         icons: [
//           "https://www.chatxbt.com/images/logo/logo-2.png",
//         ],
//       }, // Your MetaData For WalletConnect
//       projectId: "954d1cd106b485e394a1b5b7423a42bd", // For WalletConnect
//     }),
//     publicClient,
//   });
   
//   export default function Obvious({children}: any) {
//     return (
//       <WagmiConfig config={wagmiConfig}>
//         <ObviousConfig
//           embedKey="YOUR_OBVIOUS_EMBED_WALLET_KEY" // Contact ansuman@obvious.technology for you key
//           theme="dark" // light or dark
//         >
//           {/* Your dapp Code */}
//           {children}
//           <WalletButton />
//         </ObviousConfig>
//       </WagmiConfig>
//     );
//   }

  export default function Obvious({children}: any) {
    return (
      <></>
    );
  }