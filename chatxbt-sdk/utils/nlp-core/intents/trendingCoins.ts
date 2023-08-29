export const trendingCoins = [
    {
      match:
        '(check|get|lookup|find|what|can) coins trending on (coinmarketcap|coingecko) (immediately|now|instantly)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) coins trending on (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) me coins trending on (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) coins trending from (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) trending coins on (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) me coins trending from (coinmarketcap|coingecko)',
    }
  ];
  
  // check price of dai on coingecko