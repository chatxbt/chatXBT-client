export const checkCoinPrice = [
    {
      match:
        '(check|get|lookup|find|what|can) price of (@token) on (@dex) (immediately|now|instantly)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) price of (@token) on (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) (@token) price on (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) (@token) price from (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) me price of (@token) on (coinmarketcap|coingecko)',
    },
    {
      match:
        '(check|get|lookup|find|what|can) me price of (@token) from (coinmarketcap|coingecko)',
    }
  ];
  
  // check price of dai on coingecko