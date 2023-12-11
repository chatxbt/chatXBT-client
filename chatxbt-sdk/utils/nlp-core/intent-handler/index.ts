import { ethers } from "ethers";
import { toolkit } from "../../../utils";
import {
  routerV2ABI,
  routers,
  tokens,
  tokenABI,
  cTokenABI,
  comptrollerABI,
} from "../abis";
import oneInchAbi from "./1inch.json";
import { 
  useAccount, 
  useSignMessage, 
  useNetwork, 
  useDisconnect, 
  useContractRead, 
  useWalletClient,
  usePublicClient 
} from "wagmi";
import { getContract } from 'wagmi/actions'

export class IntentHandler {
  private contract: any;
  private address: string | any;
  private signer: any;

  constructor(contractConfig: any) {
    this.signer = contractConfig?.signer;
    this.address = contractConfig?.address
  }

  async handleWalletCreate(password = "Password-From-User") {
    const wallet = ethers.Wallet.createRandom();
    return {
      status: true,
      type: "create-wallet",
      message: `address: ${wallet.address}\n\n\n\nmnemonic: ${wallet.mnemonic.phrase}\n\n\n\n\n\n\n\nPlease keep these phrases safe, we cannot recover them for you if you lose them.`,
      metadata: {
        ...wallet,
        mnemonic: wallet.mnemonic.phrase,
      },
    };
  }

  async sendToL2Chain(
    token: string,
    amountIn: string | any,
    dex: string,
    chain: string,
    provider: string
  ) {
    const bridges: any = {
      "usdt": "0x3E4a3a4796d16c0Cd582C382691998f7c06420B6", // no testnet
      // "eth": "0xb8901acB165ed027E32754E0FFe830802919727f" eth mainnet
      "eth": "0xC8A4FB931e8D77df8497790381CA7d228E68a41b" // goerli testnet
    }

    const router = bridges[token];

    if (!router){
      return {
        status: true,
        type: "default-text",
        message: `bridge asset: only assets allowed on this network is eth`,
      };
    }
    let tx;

    console.log('the signer',this.signer)

    if (this.signer) {

      const contract= new ethers.Contract( 
        router, 
        [
          "function sendToL2(uint256 chainId, address recipient, uint256 amount, uint256 amountOutMin, uint256 deadline, address relayer, uint256 relayerFee) external payable",
        ],
        this.signer
      )
      // const contract = toolkit.makeContract(
      //   router, 
      //   [
      //     "function sendToL2(uint256 chainId, address recipient, uint256 amount, uint256 amountOutMin, uint256 deadline, address relayer, uint256 relayerFee)",
      //   ],
      //   signer
      // );

    //   sendToL2(
    //     uint256 chainId,
    //     address recipient,
    //     uint256 amount,
    //     uint256 amountOutMin,
    //     uint256 deadline,
    //     address relayer,
    //     uint256 relayerFee
    // )

    const deadline = Math.floor(Date.now() / 1000) + 60 * 5;
    tx = await contract.sendToL2(
      80001,
      this.address, // '0x3295186c52205b24B9e6B72d7B5207eAaB77E692',
      ethers.utils.parseEther(amountIn),
      ethers.utils.parseEther(amountIn),
      deadline,
      '0x0000000000000000000000000000000000000000',
      0,
      { 
        gasLimit: 4000000,
        value: ethers.utils.parseEther(amountIn),
        // amount: amountIn,
        // gasLimit: ethers.utils.hexlify(300000),
        // gasPrice: provider.getGasPrice(),
      }
    );
      tx = await tx.wait();
    }
    console.log('tx', tx);
    // return {
    //   status: true,
    //   type: "default-text",
    //   message: `Your asset has been bridged successfully: ${this.address} tnx hash: ${tx?.hash}`,
    // };
    return {
      status: true,
      type: "bridge",
      message: "Your asset has been bridged successfully",
      metadata: {
        ...tx,
        token,
        dex,
        chain,
        amount: amountIn,
      },
    };
  }

  async buyTokenWithEth(
    to: string,
    amountIn: string,
    dex: "uniswap",
    p: string
  ) {
    try {

      let tx: any;

      if (this.signer) {
        let toToken;
        let router;
        if (to.startsWith("0x")) {
          // it's resolved already
          toToken = to;
          // console.log(toToken);
        } else {
          toToken = tokens[to as keyof typeof tokens];
          // console.log(toToken);
        }

        //1inch

        tx = await this.oneInchSwapTokenWithEth({
          signer: this.signer,
          address: this.address,
          amountIn,
          to: toToken,
        });

        //uniswap

        // if(dex.startsWith("0x")) {
        //   router = dex;
        // } else {
        //   router = routers[dex]
        // }

        // const path = [tokens['weth'], toToken];
        // const contract = toolkit.makeContract(router, routerV2ABI, signer)
        // const amountsOut = await contract.getAmountsOut(ethers.utils.parseEther(String(amountIn)), path);
        // const now = new Date()
        // tx = await contract.swapExactETHForTokensSupportingFeeOnTransferTokens(
        //   amountsOut[1],
        //   path,
        //   address,
        //   new Date(now.setMinutes(now.getMinutes() + 5)).getTime(), { value: ethers.utils.parseEther(String(amountIn)) }
        // )
        // await tx.wait();
        
      }
      return {
        status: true,
        type: "swap",
        message: tx.hash,
        metadata: {
          ...tx,
          amount: amountIn,
          fromToken: 'Eth',
          toToken: 'USDT'
        },
      };
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });

      return {
        status: true,
        type: "default-text",
        message: `Unable to swap: ${error?.message}`,
      };
    }
  }
  async sellTokenForEth(
    from: "usdt",
    amountIn: string,
    dex: "uniswap",
    wallertProvider: string
  ) {
    try {
      const router = routers[dex];
      let signer = null;
      let address = "";
      let tx;
      if (wallertProvider.toLowerCase() === "metamask") {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // @ts-ignore
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        address = accounts[0];
        signer = provider.getSigner();
      }
      if (signer) {
        const path = [tokens[from], tokens["weth"]];
        // alert(path);
        const contract = toolkit.makeContract(router, routerV2ABI, signer);
        const amountsIn = await contract
          .connect(signer)
          .getAmountsOut(ethers.utils.parseEther(String(amountIn)), path);
        const now = new Date();
        tx = await contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
          amountsIn[0],
          0,
          path,
          address,
          new Date(now.setMinutes(now.getMinutes() + 5)).getTime()
        );
        await tx.wait();
      }
      return {
        status: true,
        type: "swap",
        message: tx.hash,
        metadata: {
          ...tx,
        },
      };
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });

      return {
        status: true,
        type: "default-text",
        message: `Unable to swap: ${error?.message}`,
      };
    }
  }

  async giveTokenSpendApproval(
    account: string,
    token: "usdt",
    provider: string
  ) {
    try {
      let signer = null;
      let address = "";
      let value = "0";
      let tx;
      if (provider === "metamask") {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // @ts-ignore
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        address = accounts[0];
        signer = provider.getSigner();
      }
      if (signer) {
        const contract = toolkit.makeContract(token, tokenABI, signer);
        const allowance = await contract.allowance(address, account);

        const decimals = await contract.decimals();
        value = Number(ethers.utils.formatUnits(allowance, decimals)).toFixed(
          4
        );
        // value = Number(ethers.utils.formatUnits(allowance, decimals)).toFixed(4);
        if (value === "0") {
          tx = await contract.approve(account, ethers.constants.MaxUint256);
          await tx.wait();
        }
      }
      return {
        type: "approval",
        message: value,
        status: true,
        metadata: {
          ...tx,
        },
      };
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });

      return {
        status: true,
        type: "default-text",
        message: `Unable to swap: ${error?.message}`,
      };
    }
  }

  async getCoinPrice({
    coin,
    to = "usd",
    dex,
    amount = 1,
  }: {
    coin: string;
    to?: string;
    dex: string;
    amount?: number;
  }) {
    try {
      switch (dex) {
        case "coingecko":
          return await toolkit.getCoinMarketChartFromCoinGecko(
            coin,
            amount,
            to
          );
        // return toolkit.getPriceFromCoingecko(coin, amount, to);
        case "coinmarketcap":
          // return toolkit.getPriceFromCoinmarketCap(coin, amount, to);
          return await toolkit.getCoinMarketChartFromCoinGecko(
            coin,
            amount,
            to
          );
        default:
          return await toolkit.getCoinMarketChartFromCoinGecko(
            coin,
            amount,
            to
          );
        // return toolkit.getPriceFromCoingecko(coin, amount, to);
      }
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });

      return {
        status: true,
        type: "default-text",
        message: `Unable to get coin price: ${error?.message}`,
      };
      return false;
    }
  }

  async searchTrendingCoins({ dex }: { dex: string }) {
    try {
      switch (dex) {
        case "coingecko":
          return await toolkit.searchTrendingCoinsFromCoinGecko();
        case "coinmarketcap":
          return toolkit.searchTrendingCoinsFromCoinGecko();
        default:
          return toolkit.searchTrendingCoinsFromCoinGecko();
      }
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });

      return {
        status: true,
        type: "default-text",
        message: `Unable to get trending: ${error?.message}`,
      };
    }
  }

  async searchTotalMarketCap({ dex }: { dex: string }) {
    try {
      switch (dex) {
        case "coingecko":
          return await toolkit.searchTotalMarketCapFromCoinGecko();
        case "coinmarketcap":
          return toolkit.searchTotalMarketCapFromCoinGecko();
        default:
          return toolkit.searchTotalMarketCapFromCoinGecko();
      }
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });
      return false;
    }
  }

  async supplyAssets(
    from: "usdt",
    amountIn: string,
    dex: "uniswap",
    provider: string
  ) {
    const router = routers[dex];
    let signer = null;
    let address = "";
    let tx;
    if (provider === "metamask") {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // @ts-ignore
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      address = accounts[0];
      signer = provider.getSigner();
    }
    if (signer) {
      const path = [tokens[from], tokens["weth"]];
      const contract = toolkit.makeContract(router, routerV2ABI, signer);
      const amountsIn = await contract
        .connect(signer)
        .getAmountsOut(ethers.utils.parseEther(String(amountIn)), path);
      const now = new Date();
      tx = await contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
        amountsIn[0],
        0,
        path,
        address,
        new Date(now.setMinutes(now.getMinutes() + 5)).getTime()
      );
      await tx.wait();
    }
    return {
      status: true,
      type: "swap",
      message: tx.hash,
      metadata: {
        ...tx,
      },
    };
  }

  // Borrow function using MetaMask as the provider
  async borrow(amountInEth: string) {
    try {
      // Modern dapp browsers (like MetaMask) automatically provide the injected ethereum object
      if (window.ethereum) {
        // @ts-ignore
        await window.ethereum.enable(); // Requesting user permission to access accounts

        // Use the MetaMask provider
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const comptrollerABI = require('./path/to/ComptrollerABI.json');
        // const cTokenABI = require('./path/to/CTokenABI.json');

        const comptrollerAddress = "0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B";
        const cETHAddress = "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5"; // Example: cETH, for other assets, you need to find the respective cToken addresses.

        const comptrollerContract = new ethers.Contract(
          comptrollerAddress,
          comptrollerABI,
          this.signer
        );
        const cTokenContract = new ethers.Contract(
          cETHAddress,
          cTokenABI,
          this.signer
        );

        // Enter the amount you want to borrow in Ether
        const amountInWei = ethers.utils.parseEther(amountInEth.toString());

        // Check if the user is allowed to borrow
        // const isAllowed = await comptrollerContract.checkBorrow(cETHAddress, provider.getSigner().getAddress(), amountInWei);
        // if (!isAllowed) {
        //   console.log('You are not allowed to borrow this amount.');
        //   return;
        // }

        // Borrow
        const tx = await cTokenContract.borrow(amountInWei);

        console.log(`${amountInEth} ETH borrowed successfully.`);
        return {
          type: "borrow",
          message: `${amountInEth} ETH borrowed successfully.`,
          status: true,
          metadata: {
            ...tx,
            amount: amountInEth,
            token: "ETH"
          },
        };
      } else {
        console.log(
          "Please install MetaMask or use a compatible dapp browser."
        );
        return {
          type: "borrow",
          message: `Please install MetaMask or use a compatible dapp browser.`,
          status: false,
          metadata: {
            // ...tx
          },
        };
      }
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });

      console.error("Error occurred while borrowing:", error);
      return {
        type: "borrow",
        message: `Error occurred while borrowing.`,
        status: false,
        metadata: {
          // ...tx
        },
      };
    }
  }

  // Lend function using MetaMask as the provider
  async lend(amountInEth: string) {
    try {
      // Modern dapp browsers (like MetaMask) automatically provide the injected ethereum object
      if (window.ethereum) {
        // @ts-ignore
        await window.ethereum.enable(); // Requesting user permission to access accounts

        // Use the MetaMask provider
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const cTokenABI = require('./path/to/CTokenABI.json');

        const cETHAddress = "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5"; // Example: cETH, for other assets, you need to find the respective cToken addresses.

        const cTokenContract = new ethers.Contract(
          cETHAddress,
          cTokenABI,
          provider.getSigner()
        );

        // Enter the amount you want to supply in Ether
        const amountInWei = ethers.utils.parseEther(amountInEth.toString());

        // Approve the cToken contract to spend your tokens
        const txApprove = await cTokenContract.approve(
          cETHAddress,
          amountInWei
        );
        await txApprove.wait(); // Wait for the transaction to be mined

        // Supply the tokens to the Compound protocol
        const txMint = await cTokenContract.mint(amountInWei);
        const tx = await txMint.wait(); // Wait for the transaction to be mined

        console.log(`${amountInEth} ETH supplied successfully.`);
        return {
          type: "lend",
          message: `${amountInEth} ETH supplied successfully.`,
          status: true,
          metadata: {
            ...tx,
          },
        };
      } else {
        console.log(
          "Please install MetaMask or use a compatible dapp browser."
        );
        return {
          type: "lend",
          message: `Please install MetaMask or use a compatible dapp browser.`,
          status: false,
          metadata: {
            // ...tx
          },
        };
      }
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });

      console.error("Error occurred while lending:", error);
      return {
        type: "lend",
        message: `Error occurred while lending.`,
        status: false,
        metadata: {
          // ...tx
        },
      };
    }
  }

  // async oneInchSwap ({signer, address}: any) {
  //   try {
  //     // Amount of token to swap
  //     const amountIn = '5';
  //     // Expected amount of token to receive
  //     const amountOut = '1';
  //     // Slippage percentage
  //     const slippage = '1'
  //     // Your recipient address
  //     const recipient = address;
  //     // Token to swap from: TOKEN_ADDRESS_HERE
  //     const tokenIn = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
  //     // Token to swap to: TOKEN_ADDRESS_HERE
  //     const tokenOut = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  //     // 1inch router address (Mainnet address, change for other networks)
  //     const routerAddress = '0x1111111254EEB25477B68fb85Ed929f73A960582';
  //     const router = new ethers.Contract(routerAddress, ['function swapExactTokensForTokens(uint256, uint256, address[], address, uint256)'], signer);

  //     const deadline = Math.floor(Date.now() / 1000) + 60 * 5; // 5 minutes from now

  //     // // Calculate the minimum amount to receive with slippage tolerance
  //     // const slippagePercentage = parseFloat(slippage) / 100;
  //     // const minAmountOut = ethers.utils.parseUnits(amountOut, 18);
  //     // const slippageAdjustedMinAmountOut = minAmountOut.sub(minAmountOut.mul(slippagePercentage).div(100));

  //     // // Ensure that the slippage-adjusted minimum amount is less than or equal to the amount to swap
  //     // if (slippageAdjustedMinAmountOut.gt(ethers.utils.parseUnits(amountIn, 18))) {
  //     //   alert('Slippage-adjusted minimum amount exceeds the amount to swap. Please reduce slippage or adjust your input.');
  //     //   // return;
  //     // }

  //     // const tx = await router.swapExactTokensForTokens(
  //     //   ethers.utils.parseUnits(amountIn, 18), // Amount of token to swap (in wei)
  //     //   slippageAdjustedMinAmountOut, // Minimum amount of token to receive with slippage
  //     //   [tokenIn, tokenOut],
  //     //   recipient,
  //     //   deadline,
  //     //   { gasLimit: 4000000 } // Set an appropriate gas limit
  //     // );

  //     const tx = await router.swapExactTokensForTokens(
  //       ethers.utils.parseUnits(amountIn, 18), // Amount of token to swap (in wei)
  //       ethers.utils.parseUnits(amountOut, 18), // Minimum amount of token to receive (in wei)
  //       [tokenIn, tokenOut],
  //       recipient,
  //       deadline,
  //       { gasLimit: 4000000 } // Set an appropriate gas limit
  //     );

  //     return await tx.wait();
  //     alert('Swap successful!');
  //   } catch (error) {
  //     console.error('Error swapping tokens:', error);
  //   } finally {
  //     // setLoading(false);
  //   }

  // }

  async oneInchSwapTokenWithEth({ signer, address, amountIn, to }: any) {
    try {
      const amountOut = "5";
      const slippage = "0.1";
      const recipient = address;
      const tokenIn = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
      const tokenOut = to || "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      const routerAddress = "0x1111111254EEB25477B68fb85Ed929f73A960582";
      const router = new ethers.Contract(
        routerAddress,
        [
          "function swapExactTokensForTokens(uint256, uint256, address[], address, uint256)",
        ],
        signer
      );

      const deadline = Math.floor(Date.now() / 1000) + 60 * 5;

      // const slippagePercentage = parseFloat(slippage) / 100;

      // const minAmountOut = ethers.utils.parseUnits(amountOut, 6);
      // const slippageAdjustedMinAmountOut = minAmountOut.sub(minAmountOut.mul(slippagePercentage).div(100));

      // if (slippageAdjustedMinAmountOut.gt(ethers.utils.parseUnits(amountIn, 18))) {
      //   alert('Slippage-adjusted minimum amount exceeds the amount to swap. Please reduce slippage or adjust your input.');
      //   return; // Stop execution if slippage-adjusted minimum amount exceeds the amount to swap
      // }

      // alert(ethers.utils.parseUnits(amountIn, 18))

      const tx = await router.swapExactTokensForTokens(
        ethers.utils.parseUnits(amountIn, 18),
        // slippageAdjustedMinAmountOut,
        0,
        [tokenIn, tokenOut],
        recipient,
        deadline,
        { 
          gasLimit: 4000000,
          value: ethers.utils.parseEther(amountIn),
        }
      );

      // alert('Swap successful!'); // Show success message before returning

      return await tx.wait();
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });
      console.error("Error swapping tokens:", error);
    }
  }

  // async oneInchSwap({ signer, address }: any) {
  //   try {
  //     const amountIn = '5';
  //     const amountOut = '5';
  //     const slippage = '0.1';
  //     const recipient = address;
  //     const tokenIn = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
  //     const tokenOut = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  //     const routerAddress = '0x1111111254EEB25477B68fb85Ed929f73A960582';
  //     const abi: any = oneInchAbi;
  //     const router = new ethers.Contract(routerAddress, abi, signer);

  //     const tx = await router.swap(
  //       ethers.utils.parseUnits(amountIn, 18),
  //       recipient,
  //       [tokenIn, tokenOut],
  //       recipient,
  //       { gasLimit: 4000000 }
  //     )
  //     // .send({
  //     //   from: accounts[1],
  //     //   value: Web3.utils.toWei('0.02', 'ether'),
  //     // });

  //     alert('Swap successful!'); // Show success message before returning

  //     return await tx.wait();
  //   } catch (error) {
  //     console.error('Error swapping tokens:', error);
  //   }
  // }
}
