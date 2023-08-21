export const lendEth = [
    {
      match:
        '(lend|give) #Value (@token) to (@dex) (immediately|now|instantly)',
    },
    {
      match: 'give approval to lend #Value (@token) to (@dex) (immediately|now|instantly)'
    },
    // {
    //   match:
    //     '(swap|convert|exchange|buy|sell) #Value (@token) (for|to) (@token) on (@dex) (immediately|now|instantly)',
    // },
    // {
    //   match:
    //     'i (want|need) to (swap|convert|exchange|buy|sell) (@token) for #Value (@token) on (@dex)',
    // },
    // {
    //   match:
    //     '{use} (@dex) to (swap|convert|exchange|buy|sell) (@token) to #Value (@token)',
    // },
    // {
    //   match: 'buy (@token) on (@dex) with #Value (@dex)'
    // },
    // {
    //   match: 'buy (@token) with #Value (@token) on (@dex)'
    // },
    // {
    //   match: 'buy (@token) #AtMention with #Value (@token)'
    // },
  ];
  
  // buy usdt on uniswap with 0.005 eth