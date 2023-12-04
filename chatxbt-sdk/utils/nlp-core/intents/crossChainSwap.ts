export const crossChainSwap = [
    {
      match:
        '(swap|send|bridge) #Value (@token) to (polygon|bsc) (immediately|now|instantly)',
    },
    {
      match:
        'i (want|need) to (swap|send|bridge) #Value (@token) to (polygon|bsc)',
    },
    {
      match:
        '{use} (@dex) to (swap|send|bridge) #Value (@token) to (polygon|bsc)',
    },
  ];
  
  // send 1 usdt to polygon
  // swap 0.005 ETH to polygon now