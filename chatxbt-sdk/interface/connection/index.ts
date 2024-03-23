
export type ConnectionStore = {
  address: string;
  connected: boolean;
  isNewToApp: boolean,
  signature: any;
  provider: string;
  visibleAddress: string;
  signMessage: (signed: string) => void;
  setIsNewToApp: (param: boolean) => void;
  connect: (address: string, signature: string, provider: string) => void;
  disconnect: () => void;
}

