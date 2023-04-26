
export type ConnectionStore = {
  address: string;
  connected: boolean;
  signature: any;
  provider: string;
  visibleAddress: string;
  signMessage: (signed: string) => void;
  connect: (address: string, signature: string, provider: string) => void;
  disconnect: () => void;
}

