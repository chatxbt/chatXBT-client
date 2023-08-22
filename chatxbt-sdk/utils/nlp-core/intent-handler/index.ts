import { ethers } from 'ethers';
import { toolkit } from '../../../utils';
import { 
    routerV2ABI, 
    routers, 
    tokens, 
    tokenABI 
} from '../abis'

export class IntentHandler {
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
          return toolkit.getPriceFromCoingecko(coin, amount, to);
        case 'coinmarketcap':
          return toolkit.getPriceFromCoinmarketCap(coin, amount, to);
        default:
          return toolkit.getPriceFromCoingecko(coin, amount, to); 
      }
    } catch (error) {
       return false;
    }
  }
}