
export type ConnectionStore = {
  address: string;
  connected: boolean;
  signature: any;
  provider: string;
  visibleAddress: string;
  googleAuth: boolean;
  signMessage: (signed: string) => void;
  connect: (address: string, signature: string, provider: string) => void;
  disconnect: () => void;
  signGoogleAuth: (param: boolean) => void;
}

