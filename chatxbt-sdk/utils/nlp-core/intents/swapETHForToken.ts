export const swapEthForToken = [
  {
    match:
      '(swap|convert|exchange|buy|sell) (eth|ethereum) for #Value (usdt|dai) on (uniswap|pancake) (immediately|now|instantly)',
  },
  {
    match:
      '(swap|convert|exchange|buy|sell) #Value (eth|ethereum) (for|to) (usdt|dai) on (uniswap|pancake) (immediately|now|instantly)',
  },
  {
    match:
      'i (want|need) to (swap|convert|exchange|buy|sell) (eth|ethereum) for #Value (usdt|dai) on (uniswap|pancake)',
  },
  {
    match:
      '{use} (uniswap|pancake) to (swap|convert|exchange|buy|sell) (eth|ethereum) to #Value (usdt|dai)',
  },
  {
    match: 'buy (usdt|dai) on (uniswap|pancake) with #Value (eth|ethereum)'
  },
  {
    match: 'buy (usdt|dai) with #Value (eth|ethereum) on (uniswap|pancake)'
  },
  {
    match: 'buy (usdt|dai) #AtMention with #Value (eth|ethereum)'
  },
];

// buy usdt on uniswap with 0.005 eth