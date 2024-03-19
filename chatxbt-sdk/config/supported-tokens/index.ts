import { env } from "../env";

export const supportedTokens = {
  dai: {
    asset: "DAI",
    coinGeckoId: "dai",
    exxhanges: {
      coinGeckoId: "dai",
      coinmarketId: 'dai'
    },
    isStable: true,
    contractAddress:
      env === "production"
        ? "0x6B175474E89094C44Da98b954EedeAC495271d0F"
        : "0xdc31ee1784292379fbb2964b3b9c4124d8f89c60",
    decimal: 1e18,
    icon: "https://assets.coingecko.com/coins/images/9956/large/4943.png?1636636734",
  },

  usdt: {
    asset: "USDT",
    coinGeckoId: "tether",
    isStable: true,
    contractAddress:
      env === "production"
        ? "0xdAC17F958D2ee523a2206206994597C13D831ec7"
        : "0xe802376580c10fe23f027e1e19ed9d54d4c9311e",
    icon: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
  },

  usdc: {
    asset: "USDC",
    coinGeckoId: "usd-coin",
    isStable: true,
    contractAddress:
      env === "production"
        ? "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        : "0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557",
    icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389, binancecoin: https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
  },

  busd: {
    asset: "BUSD",
    coinGeckoId: "binance-usd",
    isStable: true,
    contractAddress:
      env === "production"
        ? "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
        : "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    decimal: 1e18,
    icon: "https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766",
  },

  bnb: {
    asset: "BNB",
    coinGeckoId: "binancecoin",
    isStable: false,
    contractAddress: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60", //no contract address for production yet(with reference to cfm backend supported tokens) ===>> Comment Owner: Somto
    decimal: 1e8,
    icon: "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1644979850",
  },

  eth: {
    asset: "ETH",
    coinGeckoId: "ethereum",
    isStable: false,
    contractAddress: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", //no contract address for production yet(with reference to cfm backend supported tokens) ===>> Comment Owner: Somto
    decimal: 1e18,
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  },

  ethereum: {
    asset: "ETH",
    coinGeckoId: "ethereum",
    isStable: false,
    contractAddress: "",
    decimal: 1e18,
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  },

  btc: {
    asset: "BTC",
    coinGeckoId: "bitcoin",
    isStable: false,
    contractAddress: "", //no contract address for production or development yet(with reference to cfm backend supported tokens) ===>> Comment Owner: Somto
    decimal: 1e6,
    icon: " https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  },

  bitcoin: {
    asset: "BTC",
    coinGeckoId: "bitcoin",
    isStable: false,
    contractAddress: "", //no contract address for production or development yet(with reference to cfm backend supported tokens) ===>> Comment Owner: Somto
    decimal: 1e6,
    icon: " https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  },

  ltc: {
    symbol: "ltc",
    asset: "LTC",
    coinGeckoId: "litecoin",
    isStable: false,
    contractAddress: "", //no contract address for production or development yet(with reference to cfm backend supported tokens) ===>> Comment Owner: Somto
    decimal: 1e8,
    icon: " https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  },
};
