import { ethers } from "ethers";
class EthersUtils {
  ellipticAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(38)}`
  }
  makeContract(address: string, abi: string[], signer: any) {
    return new ethers.Contract(address, abi, signer);
  }
}

const etherUtils = new EthersUtils();
export default etherUtils;