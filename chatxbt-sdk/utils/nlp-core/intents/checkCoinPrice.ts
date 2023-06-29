export const checkCoinPrice = [
    {
      match:
        '(check|get|lookup|find|what|can) price of (usdt|dai) on (coinmarketcap|coingecko) (immediately|now|instantly)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) price of (usdt|dai) on (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) (usdt|dai) price on (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) (usdt|dai) price from (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) me price of (usdt|dai) on (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) me price of (usdt|dai) from (coinmarketcap|coingecko)',
    }
  ];
  
  // check price of dai on coingecko