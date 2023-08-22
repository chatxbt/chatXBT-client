
export const routerV2ABI = [
    "function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external",
    "function swapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin,address[] calldata path,address to,uint deadline) external payable",
    "function swapExactTokensForETHSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external",
    "function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts)",
    "function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts)",
    "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable",
    "function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) external",
  ]
  
  export const tokenABI = [
    "function approve(address spender, uint256 amount) external",  
    "function decimals() external view returns(uint8)",  
    "function allowance(address owner, address spender) external view returns (uint256)",
  ]
  
  
  export const routers: TRouter = {
    "uniswap": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  }
  export const tokens: TToken = {
    'usdt': "0xD1Ca0b80b188Ad76955E05d36C20C597309aD5b8",
    'dai': "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60",
    'weth': "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
  }
  
  type TRouter = {
    'uniswap': string;
  }
  type TToken = {
    'usdt': string;
    'dai': string;
    'weth': string;
  }
  
  
  