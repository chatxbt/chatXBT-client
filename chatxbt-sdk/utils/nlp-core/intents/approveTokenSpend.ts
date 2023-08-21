export const approveTokenSpend = [
  {
    match: 'give approval to (@dex) to spend #Value of (@token)'
  },
  {
    match: 'grant (#AtMention|#Noun) approval to spend up to #Value of (@token)'
  },
];

// grant uniswap approval to spend up to 50000000000 of usdt