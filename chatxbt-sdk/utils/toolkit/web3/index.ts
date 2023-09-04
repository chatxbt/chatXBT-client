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

// fetch trending coins
export const searchTrendingCoinsFromCoinGecko = async () => {
  let { data } = await publicApiConnect().get(
    `https://api.coingecko.com/api/v3/search/trending`,
  );
  return {
    status: true,
    type: 'trending-coins',
    dex: 'coin gecko',
    message: `trending coins on coingecko `,
    metadata: data?.coins || [],
  };
}

// fetch coin market chart
export const getCoinMarketChartFromCoinGecko = async (coin: string, amount: number, to: string = 'usd') => {
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
    `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7&interval=daily&precision=1`,
  );
  return {
    status: true,
    // type: 'coin-market-price history',
    type: 'coin-price',
    dex: 'coin gecko',
    message: `coin history `,
    metadata: {
      priceHistory: data?.prices || [],
      mkCapHistory: data?.market_caps || [],
      volumesHistory: data?.total_volumes || [],
      coin,
    }
  };
}

export const checkIfprotocolExist = (protocols: Array<string>, text: string): boolean => {
  text = text.toLowerCase();
  for(let i = 0; i < protocols.length; i++){
    let word_find = protocols[i].toLowerCase(); // Word to check
    let str_pos = text.indexOf(word_find);
    if (str_pos > -1) {
      return true
    } else {
      return false
    }
  }
  return false
}