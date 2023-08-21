export const borrowEth = [
    {
      match:
        '(borrow) #Value (@token) (immediately|now|instantly) from (@dex)',
    },
    {
      match: 'borrow  #Value (@token) from (@dex)'
    },
    {
      match: 'give approval to borrow #Value (@token) from (@dex) (immediately|now|instantly)'
    },
    {
      match: 'i need  #Value (@token) from (@dex)'
    },
  ];
  
  // buy usdt on uniswap with 0.005 eth