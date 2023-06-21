import { ethers } from "ethers";
import { publicApiConnect } from "../../../utils"
import { supportedTokens, lang } from '../../../config';

export const ellipticAddress = (address: string) =>  {
    return `${address.slice(0, 6)}...${address.slice(38)}`
}

export const makeContract = (address: string, abi: string[], signer: any) => {
    return new ethers.Contract(address, abi, signer);
}

// fetch coin price from coin gecko
export const getPriceFromCoingecko = async (coin: string, amount: number, to: string = 'usd') => {
    let from = coin?.toLowerCase() as 'dai';
    to = to?.toLowerCase();
    let t = to as 'dai'

    const token = supportedTokens[from] || supportedTokens[t];

    if (!token) {
      throw new Error(lang.unsupportedToken);
    }

    const fromCrypto = token.asset.toLowerCase() === from.toLowerCase();

    const crypto = token.coinGeckoId, fiat = fromCrypto ? to : from;

    let { data } = await publicApiConnect().get(
      `https://api.coingecko.com/api/v3/simple/price?` + `ids=${crypto}&vs_currencies=${fiat}`,
    );

    const rateOfCryptoToFiat = data[crypto][fiat];
    const value = fromCrypto ? (amount * parseFloat(rateOfCryptoToFiat)) : (amount / parseFloat(rateOfCryptoToFiat));
    return {
      status: true,
      type: 'coin-price',
      message: `${from} is ${value} ${to} on coingecko `,
      metadata: { rateOfCryptoToFiat, value },
    };
}

// fetch price from coin marketcap
export const getPriceFromCoinmarketCap = async (coin: string, amount: number, to: string = 'usd') => {
    return {
        status: false,
        type: 'coin-price',
        message: `coinmarketcap is yet to be integerated`,
        metadata: { },
    };
}