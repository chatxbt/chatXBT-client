export const lendEth = [
  {
    match:
      '(lend) #Value (@token) (immediately|now|instantly) to (@dex)',
  },
  {
    match: 'lend  #Value (@token) to (@dex)'
  },
  {
    match: 'give approval to lend #Value (@token) to (@dex) (immediately|now|instantly)'
  },
  // {
  //   match: 'i need  #Value (@token) from (@dex)'
  // },
];
  
  // buy usdt on uniswap with 0.005 eth