import { ethers } from 'ethers';
import { toolkit } from '../../../utils';
import { 
    routerV2ABI, 
    routers, 
    tokens, 
    tokenABI,
    cTokenABI,
    comptrollerABI
} from '../abis'

export class IntentHandler {
  private contract: any
  constructor({
    contractConfig
  }: any) {
    // configure contract
    // this.contract = await toolkit.makeContract()
  }
  async handleWalletCreate(password = 'Password-From-User') {
    const wallet = ethers.Wallet.createRandom();
    return {
      status: true,
      type: "create-wallet",
      message: `address: ${wallet.address}\n\n\n\nmnemonic: ${wallet.mnemonic.phrase}\n\n\n\n\n\n\n\nPlease keep these phrases safe, we cannot recover them for you if you lose them.`,
      metadata: {
       ...wallet,
       mnemonic: wallet.mnemonic.phrase
     }
    }
  }

  async buyTokenWithEth(to: 'usdt', amountIn: string, dex: 'uniswap', provider: string) {
    let signer = null;
    let address = ""
    let tx;
    if (provider === 'metamask') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      address = accounts[0];
      signer = provider.getSigner()
    }
    if (signer) {
      let toToken;
      let router;
      if (to.startsWith("0x")) { // it's resolved already
        toToken = to;
      } else {
        toToken = tokens[to]
      }

      if(dex.startsWith("0x")) {
        router = dex;
      } else {
        router = routers[dex]
      }
      console.log({ router })
      const path = [tokens['weth'], toToken];
      const contract = toolkit.makeContract(router, routerV2ABI, signer)
      const amountsOut = await contract.getAmountsOut(ethers.utils.parseEther(String(amountIn)), path);
      const now = new Date()
      tx = await contract.swapExactETHForTokensSupportingFeeOnTransferTokens(
        amountsOut[1],
        path,
        address,
        new Date(now.setMinutes(now.getMinutes() + 5)).getTime(), { value: ethers.utils.parseEther(String(amountIn)) }
      )
      await tx.wait();
    }
    return { 
      status: true,
      type: 'swap', 
      message: tx.hash, 
      metadata: {
        ...tx
      }
    };
  }
  async sellTokenForEth(from: 'usdt', amountIn: string, dex: 'uniswap', provider: string) {
    const router = routers[dex]
    let signer = null;
    let address = ""
    let tx;
    if (provider === 'metamask') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      address = accounts[0];
      signer = provider.getSigner()
    }
    if (signer) {
      const path = [tokens[from], tokens['weth']];
      const contract = toolkit.makeContract(router, routerV2ABI, signer)
      const amountsIn = await contract.connect(signer).getAmountsOut(ethers.utils.parseEther(String(amountIn)), path);
      const now = new Date()
      tx = await contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
        amountsIn[0],
        0,
        path,
        address,
        new Date(now.setMinutes(now.getMinutes() + 5)).getTime()
      )
      await tx.wait();
    }
    return { 
      status: true,
      type: 'swap', 
      message: tx.hash,
      metadata: {
        ...tx
      }
    };
  }

  async giveTokenSpendApproval(account: string, token: 'usdt', provider: string) {
    let signer = null;
    let address = ""
    let value = "0";
    let tx;
    if (provider === 'metamask') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      address = accounts[0];
      signer = provider.getSigner()
    }
    if (signer) {
      const contract = toolkit.makeContract(token, tokenABI, signer)
      const allowance = await contract.allowance(address, account);

      const decimals = await contract.decimals();
      value = Number(ethers.utils.formatUnits(allowance, decimals)).toFixed(4);
      // value = Number(ethers.utils.formatUnits(allowance, decimals)).toFixed(4);
      if (value === "0") {
        tx = await contract.approve(account, ethers.constants.MaxUint256)
        await tx.wait();
      }
    }
    return { 
      type: 'approval', 
      message: value,
      status: true,
      metadata: {
        ...tx
      }
    };
  }

  async getCoinPrice({ coin, to = 'usd', dex, amount = 1 }: { coin: string, to?: string, dex: string, amount?: number }) {
    try {
      switch (dex) {
        case 'coingecko':
          return await toolkit.getCoinMarketChartFromCoinGecko(coin, amount, to);
          // return toolkit.getPriceFromCoingecko(coin, amount, to);
        case 'coinmarketcap':
          // return toolkit.getPriceFromCoinmarketCap(coin, amount, to);
          return await toolkit.getCoinMarketChartFromCoinGecko(coin, amount, to);
        default:
          return await toolkit.getCoinMarketChartFromCoinGecko(coin, amount, to);
          // return toolkit.getPriceFromCoingecko(coin, amount, to); 
      }
    } catch (error) {
       return false;
    }
  }

  async searchTrendingCoins({dex}: {dex: string}){
    try{
      switch (dex) {
        case 'coingecko':
          return await toolkit.searchTrendingCoinsFromCoinGecko()
        case 'coinmarketcap':
          return toolkit.searchTrendingCoinsFromCoinGecko()
        default:
          return toolkit.searchTrendingCoinsFromCoinGecko()
      }
    } catch (error) {
      return false;
    }
  }

  async supplyAssets(from: 'usdt', amountIn: string, dex: 'uniswap', provider: string) {
    const router = routers[dex]
    let signer = null;
    let address = ""
    let tx;
    if (provider === 'metamask') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      address = accounts[0];
      signer = provider.getSigner()
    }
    if (signer) {
      const path = [tokens[from], tokens['weth']];
      const contract = toolkit.makeContract(router, routerV2ABI, signer)
      const amountsIn = await contract.connect(signer).getAmountsOut(ethers.utils.parseEther(String(amountIn)), path);
      const now = new Date()
      tx = await contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
        amountsIn[0],
        0,
        path,
        address,
        new Date(now.setMinutes(now.getMinutes() + 5)).getTime()
      )
      await tx.wait();
    }
    return { 
      status: true,
      type: 'swap', 
      message: tx.hash,
      metadata: {
        ...tx
      }
    };
  }

  // Borrow function using MetaMask as the provider
async borrow(amountInEth: string) {
  try {
    // Modern dapp browsers (like MetaMask) automatically provide the injected ethereum object
    if (window.ethereum) {
      await window.ethereum.enable(); // Requesting user permission to access accounts

      // Use the MetaMask provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const comptrollerABI = require('./path/to/ComptrollerABI.json');
      // const cTokenABI = require('./path/to/CTokenABI.json');

      const comptrollerAddress = '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B';
      const cETHAddress = '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5'; // Example: cETH, for other assets, you need to find the respective cToken addresses.

      const comptrollerContract = new ethers.Contract(comptrollerAddress, comptrollerABI, provider.getSigner());
      const cTokenContract = new ethers.Contract(cETHAddress, cTokenABI, provider.getSigner());

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
        type: 'borrow', 
        message: `${amountInEth} ETH borrowed successfully.`,
        status: true,
        metadata: {
          ...tx
        }
      };
    } else {
      console.log('Please install MetaMask or use a compatible dapp browser.');
      return { 
        type: 'borrow', 
        message: `Please install MetaMask or use a compatible dapp browser.`,
        status: false,
        metadata: {
          // ...tx
        }
      };
    }
  } catch (error) {
    console.error('Error occurred while borrowing:', error);
    return { 
      type: 'borrow', 
      message: `Error occurred while borrowing.`,
      status: false,
      metadata: {
        // ...tx
      }
    };
  }
}

// Lend function using MetaMask as the provider
async lend(amountInEth: string) {
  try {
    // Modern dapp browsers (like MetaMask) automatically provide the injected ethereum object
    if (window.ethereum) {
      await window.ethereum.enable(); // Requesting user permission to access accounts

      // Use the MetaMask provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const cTokenABI = require('./path/to/CTokenABI.json');

      const cETHAddress = '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5'; // Example: cETH, for other assets, you need to find the respective cToken addresses.

      const cTokenContract = new ethers.Contract(cETHAddress, cTokenABI, provider.getSigner());

      // Enter the amount you want to supply in Ether
      const amountInWei = ethers.utils.parseEther(amountInEth.toString());

      // Approve the cToken contract to spend your tokens
      const txApprove = await cTokenContract.approve(cETHAddress, amountInWei);
      await txApprove.wait(); // Wait for the transaction to be mined

      // Supply the tokens to the Compound protocol
      const txMint = await cTokenContract.mint(amountInWei);
      const tx = await txMint.wait(); // Wait for the transaction to be mined

      console.log(`${amountInEth} ETH supplied successfully.`);
      return { 
        type: 'lend', 
        message: `${amountInEth} ETH supplied successfully.`,
        status: true,
        metadata: {
          ...tx
        }
      };
    } else {
      console.log('Please install MetaMask or use a compatible dapp browser.');
      return { 
        type: 'lend', 
        message: `Please install MetaMask or use a compatible dapp browser.`,
        status: false,
        metadata: {
          // ...tx
        }
      };
    }
  } catch (error) {
    console.error('Error occurred while lending:', error);
    return { 
      type: 'lend', 
      message: `Error occurred while lending.`,
      status: false,
      metadata: {
        // ...tx
      }
    };
  }
}


}
